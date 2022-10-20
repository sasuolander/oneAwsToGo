import InDeploymentStackService from "../services/inDeploymentStackService";
import { CommonControllerConfig } from "../utils/CommonRoutesConfig";
import {Application, Request, Response} from 'express';
import { stat } from "fs";
import IStatusPayload from "../interfaces/statusPayloadInterface";

export default class InDeploymentStackController extends CommonControllerConfig {
    private inDeploymentStackStatusService : InDeploymentStackService

    constructor(app: Application, deploymentStatusService: InDeploymentStackService) {
        super(app, "DeploymentStatusController");
        this.inDeploymentStackStatusService = deploymentStatusService;
    }

    configureRoutes(): Application {
        this.app.route(`/deployedstacks`)
        .get(async (req: Request, res: Response) => {
            const stacks = await this.inDeploymentStackStatusService.list()
            res.status(200).send(stacks);
        });

        this.app.route(`/deploymentstatus/`)
        .post(async (req: Request, res: Response) => {
            const payload : IStatusPayload = req.body;
            const status = await this.inDeploymentStackStatusService.checkDeploymentStatus(payload);
            res.status(200).send(status);
        })
        return this.app;
    }
    
}