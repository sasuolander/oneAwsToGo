import {CommonControllerConfig} from '../utils/CommonRoutesConfig';
import TemplateService from '../services/templateService';
import {Application, Request, Response, NextFunction} from 'express';

export default class TemplateController extends CommonControllerConfig{
    private templateService : TemplateService

    constructor(app: Application, templateService: TemplateService) {
        super(app, "TemplateController");
        this.templateService = templateService;  
    }

    configureRoutes() {
        this.app.route(`/templates`)
        .get(async (req: Request, res: Response) => {
            const templates = await this.templateService.list();
            res.status(200).send(templates);
        })
        .post(async (req: Request, res: Response) => {
            const template = await this.templateService.create(req.body);
            res.status(201).send(template);
        });
    //TODO: Implement 404 cases
    this.app.route(`/templates/:id`)
        .get(async (req: Request, res: Response) => {
            const template = await this.templateService.readById(parseInt(req.params.id));
            res.status(200).send(template);
        })
        .put(async (req: Request, res: Response) => {
            const responseMessage = await this.templateService.putById(parseInt(req.params.id), req.body)
            res.status(204).send();
        })
        .delete(async (req: Request, res: Response) => {
            const responseMessage = await this.templateService.deleteById(parseInt(req.params.id));
            res.status(204).send();
        });

        return this.app;
    }
}

