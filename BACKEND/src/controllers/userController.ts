import {CommonControllerConfig} from '../utils/CommonRoutesConfig';
import {Application, Request, Response, NextFunction} from 'express';
import UserService from '../services/userService';

export default class UserController extends CommonControllerConfig {
    private userService : UserService

    constructor(app: Application, userService: UserService) {
        super(app, 'UserRoutes');
        this.userService = userService;
    }

    configureRoutes() {
        this.app.route(`/users`)
        .get(async (req: Request, res: Response) => {
            const users = await this.userService.list();
            res.status(200).send(users);
        })
        .post(async (req: Request, res: Response) => {
            const user = await this.userService.create(req.body);
            res.status(201).send(user);
        });
    //TODO: Implement 404 cases
    this.app.route(`/users/:id`)
        .get(async (req: Request, res: Response) => {
            const user = await this.userService.readById(parseInt(req.params.id));
            res.status(200).send(user);
        })
        .put(async (req: Request, res: Response) => {
            const responseMessage = await this.userService.putById(parseInt(req.params.id), req.body);
            res.status(204).send(); 
        })
        .delete(async (req: Request, res: Response) => {
            const responseMessage = await this.userService.deleteById(parseInt(req.params.id));
            res.status(204).send();
        });

        return this.app;
    }

}

