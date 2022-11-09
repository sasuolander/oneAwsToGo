import React, {useEffect, useState} from 'react';
import '../styles/createEnvironment.css';
import DeployService from "../service/deployService";
import FetchTemplateService from "../service/fetchTemplateService";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DynamicForm from '../components/dynamicForm/dynamicForm'
import {TemplatePayload} from "../utils/backend";
import '../styles/infoCard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeploymentStatusService from '../service/deploymentStatusService';
import FetchDeployedService from "../service/fetchDeployedService";
import LinearProgress from '@mui/material/LinearProgress';
import '../styles/progressBar.css';
import Grid from "@mui/material/Grid"

// TODO think out injection or provider system when using service in react
const deployService = new DeployService();
const templateService = new FetchTemplateService();
const deploymentStatusService = new DeploymentStatusService();
const fetchDeployedService = new FetchDeployedService();

interface IEventChange extends React.ChangeEvent<HTMLInputElement> {

}

interface ITemplateItem {
    id: string,
    data: TemplatePayload
}

function CreateEnvironment() {

    const [templId, setTempId] = useState("");
    const [templates, setTemplates] = useState<ITemplateItem[]>([])
    const [templatesReady, setTemplatesReady] = useState(false);
    const [cardText, setCardText] = useState("");
    const [cardVisible, setCardVisibility] = useState(false);
    const [cardColor, setCardColor] = useState("white");
    const [progressVisible, setProgressVisibility] = useState(false);

    const sendData = async (id: string, data: any) => {
        setCardColor("white");
        setCardVisibility(false);
        setCardText("");
        setProgressVisibility(false);

        if (id !== "") {
            const name = data[0].field_value
            const cropData = data.filter((f: { field_id: string; }) => f.field_id !== "deployment_name")
            deployService.triggerCreation(Number(id), name, cropData)
                .then(response => {
                    handleDeploymentUpdates(String(response.deploymentId), Number(response.id));
                })
                .catch(error => handleDeploymentError(error))
        }
    }

    const handleDeploymentError = (error: any) => {
        setProgressVisibility(false);
        setCardColor("lightcoral");
        updateCardText("Error: " + error.response.data.errorMessage);
        setCardVisibility(true);
    }

    const handleDeploymentUpdates = async (stackId: string, internalId: Number) => {
        const timeout = async (ms:number) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        setCardColor("white");
        setCardVisibility(true);
        setProgressVisibility(true);
        //const internalId = await fetchDeployedService.getDeploymentIdByStackId(stackId);
        updateCardText("Creating an environment with id " + internalId + " and stackId " + stackId);

        if (internalId !== undefined) {

            while (true) {
                let statusResponse = await deploymentStatusService.fetchDeploymentStatus(Number(internalId));
                if (statusResponse.status === "CREATE_COMPLETE") {
                    setProgressVisibility(false);
                    setCardColor("palegreen");
                    updateCardText("Successfully created an environment with id " + internalId + " and stackId " + stackId);
                    break;
                } else if (statusResponse.status === "CREATE_FAILED") {
                    setProgressVisibility(false);
                    setCardColor("lightcoral");
                    updateCardText("Failed to create an environment with id " + internalId + " and stackId " + stackId)
                    break;
                } 
                await timeout(5000);
            }
        }
    }


    const updateCardText = (text: string) => {
        setCardText(text);
    }

    useEffect(() => {
        if (!templatesReady) {
            templateService.getTemplates().then(function (response) {
                const templatesData = response.map(r => {
                    return {id: String(r.id), data: r} as ITemplateItem
                })
                setTemplates(templatesData);
            });
            setTemplatesReady(true);
        }

    }, []);

    const nameForNewTemplate = {
        field_id: "deployment_name",
        field_label: "Deployment name",
        field_mandatory: "yes",
        field_placeholder: "Enter deployment name",
        field_type: "text",
        field_value: "",
        field_error: "You must give name for deployment",
        field_regex: "[a-zA-Z][a-zA-Z0-9]*",
        field_min: "1"
    }

    return (
        <div className="create-environment-component container">
            <h2>Create an environment</h2>
            <div className="form-div">
                <TextField id="template-dropdown" label="Template" helperText="Select a template" variant="outlined"
                           value={templId} onChange={(e: IEventChange) => setTempId(e.target.value)} select
                           required>
                    {templates.map((template) => {
                        return (
                            <MenuItem key={template.data.id} value={template.data.id}>{template.data.name}</MenuItem>
                        );
                    })}
                </TextField>
            </div>
            {typeof templates.find(r => r.id == templId) !== "undefined" ?
                <DynamicForm defaultValues={nameForNewTemplate} metaData={templId}
                             config={templates.find(r => r.id == templId)?.data.formConfig} submitFormExec={sendData}
                /> : <div></div>
            }
            {<Card id="info-card" className="infoCard" variant="outlined" style={{visibility: cardVisible ? "visible" : "hidden", backgroundColor: cardColor}}>
                <CardContent className="cardContent">
                    <Typography className="statusText">{cardText}</Typography>
                </CardContent>
            </Card>}
            <Grid id="progress-grid" className="progressContainer" container>
                <Grid id="progress-grid-item" className="progressGridItem" xs item>
                    <LinearProgress id="progress-bar" className="progressBar" variant="indeterminate" style={{visibility: progressVisible ? "visible" : "hidden"}}/>
                </Grid>
            </Grid>
       </div>

    );
}

export default CreateEnvironment;
