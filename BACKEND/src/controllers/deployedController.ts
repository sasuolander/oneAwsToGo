import {Application, Request, Response} from "express";
import {CommonControllerConfig} from "../utils/CommonRoutesConfig";
import DeployedService from "../services/deployedService";

export default class DeployedController extends CommonControllerConfig {
    private deployedService: DeployedService

    constructor(app: Application, deployedService: DeployedService) {
        super(app, "DeployedController");
        this.deployedService = deployedService;
    }

    configureRoutes(): Application {
        this.app.route(`/deployed`)
            .get(async (req: Request, res: Response) => {
                const stacks = await this.deployedService.list()
                res.status(200).send(stacks);
            })
            .delete(async (req: Request, res: Response) => {
                const responseMessage = await this.deployedService.deleteStack(parseInt(req.body.id));
                res.status(204).send();
            });

        return this.app;
    }
}
