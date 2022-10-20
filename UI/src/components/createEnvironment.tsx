import React, {useEffect, useState} from 'react';
import '../styles/createEnvironment.css';
import DeployService from "../service/deployService";
import FetchTemplateService from "../service/fetchTemplateService";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DynamicForm from '../components/dynamicForm/dynamicForm'
import {TemplatePayload} from "../utils/backend";

// TODO think out injection or provider system when using service in react
const deployService = new DeployService();
const templateService = new FetchTemplateService();

interface IEventChange extends React.ChangeEvent<HTMLInputElement> {

}

interface IEventSubmit extends React.FormEvent<HTMLFormElement> {

}

interface ITemplateTree {
    id:string,
    data:TemplatePayload
}

function CreateEnvironment() {

    const [templId, setTempId] = useState("");
    const [templates, setTemplates] = useState<ITemplateTree[]>([])
    const [templatesReady, setTemplatesReady] = useState("false");

    const sendData = async (id:string,data:any) => {
        if (id !== "") {
            const name = data[0].field_value
            const cropData = data.filter((f: { field_id: string; })=>f.field_id !== "deployment_name")
            const startProcess = await deployService.triggerCreation(Number(id),name,cropData)
            console.log("pressing CreateEnvironment",startProcess)
        }
    }

    useEffect(() => {
        if(templatesReady === "false") {
            const promise = templateService.getTemplates();
            promise.then(function (response) {
                const tree = response.map(r=>{return {id:String(r.id),data:r} as ITemplateTree})
                return setTemplates(tree);

            });
            setTemplatesReady("true");
        }

    },[]);

    const dynamicform = (nameForNewTemplate:any,handleSubmit:any) =>{
        if (typeof templates.find(r=> r.id == templId) !== "undefined") {
           return <DynamicForm defaultValues={nameForNewTemplate} metaData={templId}
                               config={templates.find(r => r.id == templId)?.data.formConfig} sendData={handleSubmit}
           />
        } else {
            return <div></div>
        }
    }

    const nameForNewTemplate = {
        field_id: "deployment_name",
        field_label: "Deployment name",
        field_mandatory: "yes",
        field_placeholder: "Enter deployment name",
        field_type: "text",
        field_value: "",
        field_error:"You must give name for deployment",
        field_regex:"[a-zA-Z][a-zA-Z0-9]*",
        field_min: "1"
    }
    return (
        <div className="create-environment-component container">
            <h2>Create an environment</h2>
                {
                    dynamicform(nameForNewTemplate,sendData)
                }
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

        </div>
    );
}

export default CreateEnvironment;
