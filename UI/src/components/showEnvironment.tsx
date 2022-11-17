import FetchDeployedService from "../service/fetchDeployedService";
import { useState, useEffect} from "react";
import { DeployedPayload } from "../utils/backend";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingButton from "@mui/lab/LoadingButton"
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/showEnvironment.css"
import DeleteService from "../service/deleteDeploymentService";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert, { AlertColor } from '@mui/material/Alert';


function ShowEnvironment() {
    let fetchObj = new FetchDeployedService();
    const deleteService = new DeleteService();
    const [envs, setEnvs] = useState<DeployedPayload[]>([]);
    const [envsReady, setEnvsReady] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationSeverity, setnotificationSeverity] = useState<AlertColor>("info");

    useEffect(() => {
        if(!envsReady) {
            getDeployed();
        }

    }, []);

    const getDeployed = async () => {
        let deployed = fetchObj.getDeployed();
        deployed.then((result) => {
            setEnvs(result);
            setEnvsReady(true);
        })
    }
    
    const handleClick = async (id: Number) => {
        deleteService.deleteDeployment(Number(id))
        .then(response => {
            handleSuccess(id, response);
        })
        .catch(error => handleDeletionError(id, error))
    }

    const handleDeletionError = (id: Number, error: any) => {
        setNotificationMessage("Failed to remove environment with id " + id + " : "  + error);
        setnotificationSeverity("error");
        setNotificationOpen(true);
    }

    const handleSuccess = (id: Number, response: any) => {
        setnotificationSeverity("success");
        setNotificationMessage("Successfully removed environment with id " + id + "!");
        setNotificationOpen(true);
        getDeployed();
    }

    const notificationClose= () => {
        setNotificationOpen(false);
        setNotificationMessage("");
        setnotificationSeverity("info");       
    }

    const notificationAction = (
        <IconButton size="small" aria-label="close" color="inherit" onClick={notificationClose}>
        <CloseIcon fontSize="small" />
        </IconButton>
    );
    
    const tableRows = envs.map(
        (element) => {
            return (

                <tr id={"row-".concat(String(element.id))}>
                    <td id={"id-".concat(String(element.id))}>{String(element.id)}</td>
                    <td id={"name-".concat(String(element.id))}>{element.name}</td>
                    <td id={"stackId-".concat(String(element.id))}>{element.stackId}</td>
                    <td id={"status-".concat(String(element.id))}>{element.status}</td>
                    <td ><LoadingButton startIcon={<DeleteIcon />} className="removeButton" id={"remove-".concat(String(element.id))} 
                    variant="contained" loadingPosition="start" loading={false} onClick={() =>handleClick(Number(element.id))}>Remove</LoadingButton></td>
                </tr>
            )
        }
    )
    return (
        <div id="my-envs-container" className="myEnvsContainer">
            <h2 id="my-envs-title">My environments</h2>
            <Snackbar id="notification" action={notificationAction} open={notificationOpen} onClose={notificationClose} 
            autoHideDuration={10000}>
                <MuiAlert severity={notificationSeverity} onClose={notificationClose}>{notificationMessage}</MuiAlert>
            </Snackbar>
            <div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Stack ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </Table>
            </div>
        </div>
    )

}

export default ShowEnvironment;