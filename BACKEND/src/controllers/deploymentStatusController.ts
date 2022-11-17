import InDeploymentStackService from "../services/inDeploymentStackService";
import { CommonControllerConfig } from "../utils/CommonRoutesConfig";
import {Application, Request, Response} from 'express';
import IStatusPayload from "../interfaces/statusPayloadInterface";

export default class InDeploymentStackController extends CommonControllerConfig {
    private inDeploymentStackStatusService : InDeploymentStackService

    constructor(app: Application, deploymentStatusService: InDeploymentStackService) {
        super(app, "DeploymentStatusController");
        this.inDeploymentStackStatusService = deploymentStatusService;
    }

    configureRoutes(): Application {
        this.app.route(`/deployed`)
        .get(async (req: Request, res: Response) => {
            const stacks = await this.inDeploymentStackStatusService.list()
            res.status(200).send(stacks);
        })
        .delete(async (req: Request, res: Response) => {
            const responseMessage = await this.inDeploymentStackStatusService.deleteByStackId(parseInt(req.params.id));
            res.status(204).send();
        });

        this.app.route(`/checkdeployed/`)
        .post(async (req: Request, res: Response) => {
            const payload : IStatusPayload = req.body;
            const status = await this.inDeploymentStackStatusService.checkDeploymentStatus(payload);
            if(status) {
                res.status(200).send(status);
            } else {
                res.status(404).send("Stack not found");
            }
        })
        return this.app;
    }
    
}