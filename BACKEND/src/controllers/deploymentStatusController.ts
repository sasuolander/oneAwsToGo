import InDeploymentStackService from "../services/inDeploymentStackService";
import { CommonControllerConfig } from "../utils/CommonRoutesConfig";
import {Application, Request, Response} from 'express';
import { stat } from "fs";

export default class InDeploymentStackController extends CommonControllerConfig {
    private deploymentStatusService : InDeploymentStackService

    constructor(app: Application, deploymentStatusService: InDeploymentStackService) {
        super(app, "DeploymentStatusController");
        this.deploymentStatusService = deploymentStatusService;
    }

    configureRoutes(): Application {
        this.app.route(`/deployedstacks`)
        .get(async (req: Request, res: Response) => {
            const stacks = await this.deploymentStatusService.list()
            res.status(200).send(stacks);
        });

        this.app.route(`/deploymentstatus/:id`)
        .get(async (req: Request, res: Response) => {
            const status = await this.deploymentStatusService.checkDeploymentStatus(req.params.id as string);
            res.status(200).send(status);
        })
        return this.app;
    }
    
}