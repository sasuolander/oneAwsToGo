import FetchDeployedService from "../service/fetchDeployedService";
import React, { useState, useEffect } from "react";
import { DeployedPayload } from "../utils/backend";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { CompressOutlined } from "@mui/icons-material";
import { Console } from "console";

function ShowEnvironment() {
    let fetchObj = new FetchDeployedService();
    let deployed = fetchObj.getDeployed();
    const [envs, setEnvs] = useState<DeployedPayload[]>([]);

    useEffect(() => {
        deployed.then((result) => {
            setEnvs(result);
        })
    });


    const tableRows = envs.map(
        (element) => {
            return (

                <tr>
                    <td>{String(element.id)}</td>
                    <td>{element.name}</td>
                    <td>{element.stackId}</td>
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