import {CommonControllerConfig} from '../utils/CommonRoutesConfig';
import TemplateService from '../services/templateService';
import {Application, Request, Response, NextFunction} from 'express';
import {TemplateFormat} from "../interfaces/templateInterface";
import UserService from '../services/userService';
import InDeploymentStackService from "../services/inDeploymentStackService";
import IInDeploymentStack from "../interfaces/inDeploymentStackInterface";
import { use } from 'chai';


export default class StackController extends CommonControllerConfig{
    private deployedStackService : InDeploymentStackService;

    constructor(app: Application,  deployedStackService: InDeploymentStackService) {
        super(app, 'UserRoutes');
        this.deployedStackService = deployedStackService;
    }

    configureRoutes() : Application {
    this.app.route(`/stacks/:id`)
        .get(async (req: Request, res: Response) => {
            const stack = await this.deployedStackService.getByStackId(req.params.id);
            res.status(200).send(stack);
        })
        .delete(async (req: Request, res: Response) => {
            const responseMessage = await this.deployedStackService.deleteByStackId(parseInt(req.params.id));
            res.status(204).send();
        });

        return this.app;
    }
}
