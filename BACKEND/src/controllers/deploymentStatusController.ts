import InDeploymentStackService from "../services/inDeploymentStackService";
import { CommonControllerConfig } from "../utils/CommonRoutesConfig";
import {Application, Request, Response} from 'express';
import IStatusPayload from "../interfaces/statusPayloadInterface";

export default class InDeploymentStackController extends CommonControllerConfig {
    private inDeploymentStackStatusService : InDeploymentStackService

    constructor(app: Application, inDeploymentStackStatusService: InDeploymentStackService) {
        super(app, "InDeploymentStackController");
        this.inDeploymentStackStatusService = inDeploymentStackStatusService;
    }

    configureRoutes(): Application {
        this.app.route(`/checkdeployed`)
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
