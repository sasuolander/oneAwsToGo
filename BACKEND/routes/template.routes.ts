import {CommonRoutesConfig} from '../utils/CommonRoutesConfig';
import {Application, Request, Response, NextFunction} from 'express';

export class TemplateRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'TemplateRoutes');
    }

    configureRoutes() {
        this.app.route(`/templates`)
        .get((req: Request, res: Response) => {
            res.status(200).send(`GET /templates`);
        })
        .post((req: Request, res: Response) => {
            res.status(200).send(`POST /templates`);
        });

    this.app.route(`/templates/:templateId`)
        .all((req: Request, res: Response, next: NextFunction) => {
            //This is called before any CRUD calls, can be used to authorize users maybe
            next();
        })
        .get((req: Request, res: Response) => {
            res.status(200).send(`GET requested for id ${req.params.templateId}`);
        })
        .put((req: Request, res: Response) => {
            res.status(200).send(`PUT requested for id ${req.params.templateId}`);
        })
        .patch((req: Request, res: Response) => {
            res.status(200).send(`PATCH requested for id ${req.params.templateId}`);
        })
        .delete((req: Request, res: Response) => {
            res.status(200).send(`DELETE requested for id ${req.params.templateId}`);
        });

        return this.app;
    }
}

