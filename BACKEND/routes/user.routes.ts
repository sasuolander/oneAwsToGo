import {CommonRoutesConfig} from '../utils/CommonRoutesConfig';
import {Application, Request, Response, NextFunction} from 'express';

export class UserRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'UserRoutes');
    }

    configureRoutes() {
        this.app.route(`/users`)
        .get((req: Request, res: Response) => {
            res.status(200).send(`GET /users`);
        })
        .post((req: Request, res: Response) => {
            res.status(200).send(`POST /users`);
        });

    this.app.route(`/templates/:templateId`)
        .all((req: Request, res: Response, next: NextFunction) => {
            //This is called before any CRUD calls, can be used to authorize users maybe
            next();
        })
        .get((req: Request, res: Response) => {
            res.status(200).send(`GET requested for id ${req.params.userId}`);
        })
        .put((req: Request, res: Response) => {
            res.status(200).send(`PUT requested for id ${req.params.userId}`);
        })
        .patch((req: Request, res: Response) => {
            res.status(200).send(`PATCH requested for id ${req.params.userId}`);
        })
        .delete((req: Request, res: Response) => {
            res.status(200).send(`DELETE requested for id ${req.params.userId}`);
        });

        return this.app;
    }

}