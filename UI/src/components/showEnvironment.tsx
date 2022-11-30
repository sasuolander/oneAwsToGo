import FetchDeployedService from "../service/fetchDeployedService";
import { useState, useEffect} from "react";
import { DeployedPayload } from "../utils/backend";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingButton from "@mui/lab/LoadingButton"
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/showEnvironment.css"
import DeleteService from "../service/deleteDeploymentService";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

const fetchObj = new FetchDeployedService();
const deleteService = new DeleteService();

function ShowEnvironment() {
    const [envs, setEnvs] = useState<DeployedPayload[]>([]);
    const [envsReady, setEnvsReady] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationSeverity, setnotificationSeverity] = useState<AlertColor>("info");
    const [loadingStatuses, setLoadingStatuses] = useState<any>([]);

    useEffect(() => {
        if(!envsReady) {
            let deployed = fetchObj.getDeployed();
            deployed.then((result) => {
                setEnvs(result);
                setEnvsReady(true);
            })
        }

    }, [envsReady]);

    const getDeployed = async () => {
        let deployed = fetchObj.getDeployed();
        deployed.then((result) => {
            setEnvs(result);
            setEnvsReady(true);
        })
    }
    
    const handleClick = async (id: Number) => {
        setLoadingStatus(id, true);
        deleteService.deleteDeployment(Number(id))
        .then(response => {
            handleDeletionUpdates(id, response);
        })
        .catch(error => handleDeletionError(id, error))
    }

    const handleDeletionError = (id: Number, error: any) => {
        setLoadingStatus(id, false);
        setNotificationMessage("Failed to remove environment with id " + id + " : "  + error);
        setnotificationSeverity("error");
        setNotificationOpen(true);
        getDeployed();
    }

    const handleDeletionUpdates = (id: Number, response: any) => {
        handleSuccess(id, response);
    }

    const handleSuccess = (id: Number, response: any) => {
        setLoadingStatus(id, false);
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

    const setLoadingStatus = (id: Number, status: boolean) => {
        const spliced  = loadingStatuses.slice();
        spliced[Number(id)] = status;
        setLoadingStatuses(spliced);     
    }
  

    const tableRows = envs.map(
        (element) => {

            return (

                <TableRow id={"row-".concat(String(element.id))}>
                    <TableCell id={"id-".concat(String(element.id))}>{String(element.id)}</TableCell>
                    <TableCell id={"name-".concat(String(element.id))}>{element.name}</TableCell>
                    <TableCell id={"stackId-".concat(String(element.id))}>{element.stackId}</TableCell>
                    <TableCell id={"status-".concat(String(element.id))}>{element.status}</TableCell>
                    <TableCell ><LoadingButton startIcon={<DeleteIcon />} className="removeButton" id={"remove-".concat(String(element.id))} 
                    variant="contained" loadingPosition="start" loading={loadingStatuses[Number(element.id)] || false} onClick={() =>handleClick(Number(element.id))}>Remove</LoadingButton></TableCell>
                </TableRow>
            )

        }
    )
    return (
        <div id="my-envs-container" className="myEnvsContainer">
            <h2 id="my-envs-title">My environments</h2>
            <Snackbar id="notification" action={notificationAction} open={notificationOpen} onClose={notificationClose} 
            autoHideDuration={10000} anchorOrigin={{vertical: "top", horizontal: "center"}}>
                <MuiAlert severity={notificationSeverity} onClose={notificationClose}>{notificationMessage}</MuiAlert>
            </Snackbar>
            <div>
                <Card id="my-envs-card" className="myEnvsCard">
                    <CardContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Stack ID</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableRows}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )

}

export default ShowEnvironment;