import FetchDeployedService from "../service/fetchDeployedService";
import DeploymentStatusService from "../service/deploymentStatusService";
import { useState, useEffect} from "react";
import { DeployedPayload } from "../utils/backend";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingButton from "@mui/lab/LoadingButton"
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/showEnvironment.css"
import DeleteService from "../service/deleteDeploymentService";

function ShowEnvironment() {
    let fetchObj = new FetchDeployedService();
    const deleteService = new DeleteService();
    const deploymentStatusService = new DeploymentStatusService();
    let deployed = fetchObj.getDeployed();
    const [envs, setEnvs] = useState<DeployedPayload[]>([]);
    const [envsReady, setEnvsReady] = useState(false);

    useEffect(() => {

        if(!envsReady) {
            deployed.then((result) => {
                setEnvs(result);
                setEnvsReady(true);
            })
        }
    }, []);

    //TODO: Finish when endpoint works.
    const handleClick = async (id: Number) => {
        const response = deleteService.deleteDeployment(Number(id));
        const status = await deploymentStatusService.fetchDeploymentStatus(id);
    }

    const updateStatus = (id: Number, status: String) => {
        const statusElem = document.getElementById("status-" + id);

        if (statusElem !== null) {
            statusElem.innerText = String(status);
        }
    }
    
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
    )


}

export default ShowEnvironment;