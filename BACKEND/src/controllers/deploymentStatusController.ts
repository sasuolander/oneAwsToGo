import InDeploymentStackService from "../services/inDeploymentStackService";
import { CommonControllerConfig } from "../utils/CommonRoutesConfig";
import {Application, Request, Response} from 'express';
import { stat } from "fs";

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

        this.app.route(`/deploymentstatus/:id`)
        .get(async (req: Request, res: Response) => {
            const status = await this.inDeploymentStackStatusService.checkDeploymentStatus(req.params.id as string);
            console.log(status);
            res.status(200).send(status);
        })
        return this.app;
    }
    
}