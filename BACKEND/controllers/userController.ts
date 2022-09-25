import {CommonControllerConfig} from '../utils/CommonRoutesConfig';
import {Application, Request, Response, NextFunction} from 'express';
import UserService from '../services/userService';

export class UserController extends CommonControllerConfig {
    constructor(app: Application) {
        super(app, 'UserRoutes');
    }

    configureRoutes() {
        this.app.route(`/users`)
        .get(async (req: Request, res: Response) => {
            const users = await UserService.list();
            res.status(200).send(users);
        })
        .post(async (req: Request, res: Response) => {
            const user = await UserService.create(req.body);
            res.status(201).send(user);
        });

    this.app.route(`/users/:id`)
        .get(async (req: Request, res: Response) => {
            const user = await UserService.readById(parseInt(req.params.id));
            res.status(200).send(user);
        })
        .put(async (req: Request, res: Response) => {
            const responseMessage = await UserService.putById(parseInt(req.params.id), req.body);
            res.status(204).send(); 
        })
        .delete(async (req: Request, res: Response) => {
            const responseMessage = await UserService.deleteById(parseInt(req.params.id));
            res.status(204).send();
        });

        return this.app;
    }

}