import FetchDeployedService from "../service/fetchDeployedService";
import { useState, useEffect } from "react";
import { DeployedPayload } from "../utils/backend";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

function ShowEnvironment() {
    let fetchObj = new FetchDeployedService();
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

    const tableRows = envs.map(
        (element) => {
            return (

                <tr>
                    <td>{String(element.id)}</td>
                    <td>{element.name}</td>
                    <td>{element.stackId}</td>
                    <td>{element.status}</td>
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