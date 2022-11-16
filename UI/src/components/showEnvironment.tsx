import FetchDeployedService from "../service/fetchDeployedService";
import { useState, useEffect } from "react";
import { DeployedPayload } from "../utils/backend";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/showEnvironment.css";

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
        <div id="my-envs-container" className="myEnvsContainer">
            <h2 id="my-envs-title">My environments</h2>
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