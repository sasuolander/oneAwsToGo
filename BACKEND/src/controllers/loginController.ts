import {CommonControllerConfig} from '../utils/CommonRoutesConfig';
import TemplateService from '../services/templateService';
import {Application, Request, Response, NextFunction} from 'express';
import {TemplateFormat} from "../interfaces/templateInterface";
import UserService from '../services/userService';
import { use } from 'chai';

interface ILoginPayload {
    name: string;
    password: string;

}

class LoginPayload implements ILoginPayload{
    name: string;
    password: string;


    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }
}

export default class LoginController extends CommonControllerConfig{
    private userService : UserService

    constructor(app: Application, userService: UserService) {
        super(app, 'UserRoutes');
        this.userService = userService;
    }

    configureRoutes() : Application{
        this.app.route(`/login`)
        .get(async (req: Request, res: Response) => {
            const users = await this.userService.list()
            const returnList = users.map(r=> new LoginPayload(r.name, r.password));
            res.status(200).send(returnList);
        })
        .post(async (req: Request, res: Response) => {
            const user = await this.userService.create(req.body);
            res.status(201).send(user);
        });

    this.app.route(`/login/:name`)
        .get(async (req: Request, res: Response) => {
            const user = await this.userService.readByLogin(req.params.name, req.params.password);
            if (typeof user !== 'undefined' ) {
                res.status(200).send(
                    new LoginPayload(user.name, user.password));
            } else {
                res.status(404)
            }

        });

        return this.app;
    }
}

