import {CommonControllerConfig} from '../utils/CommonRoutesConfig';
import TemplateService from '../services/templateService';
import {Application, Request, Response, NextFunction} from 'express';

export default class TemplateController extends CommonControllerConfig {
    constructor(app: Application) {
        super(app, 'TemplateRoutes');
    }

    configureRoutes() {
        this.app.route(`/templates`)
        .get(async (req: Request, res: Response) => {
            const templates = await TemplateService.list();
            res.status(200).send(templates);
        })
        .post(async (req: Request, res: Response) => {
            const template = await TemplateService.create(req.body);
            res.status(201).send(template);
        });

    this.app.route(`/templates/:id`)
        .get(async (req: Request, res: Response) => {
            const template = await TemplateService.readById(parseInt(req.params.id));
            res.status(200).send(template);
        })
        .put(async (req: Request, res: Response) => {
            const responseMessage = await TemplateService.putById(parseInt(req.params.id), req.body)
            res.status(204).send();
        })
        .delete(async (req: Request, res: Response) => {
            const responseMessage = await TemplateService.deleteById(parseInt(req.params.id));
            res.status(204).send();
        });

        return this.app;
    }
}

