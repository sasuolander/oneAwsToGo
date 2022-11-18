import {CommonControllerConfig} from '../utils/CommonRoutesConfig';
import TemplateService from '../services/templateService';
import {Application, Request, Response, NextFunction} from 'express';
import {TemplateFormat} from "../interfaces/templateInterface";
import {HealthController} from "./healthController";

interface ITemplatePayload {
    id: number;
    name: string;
    formConfig:string;
    templateFormat:TemplateFormat;
}

class TemplatePayload implements ITemplatePayload{
    id: number;
    name: string;
    formConfig:string;
    templateFormat:TemplateFormat;

    constructor(id: number, name: string, formConfig: string, templateFormat: TemplateFormat) {
        this.id = id;
        this.name = name;
        this.formConfig = formConfig;
        this.templateFormat = templateFormat;
    }
}

export default class TemplateController extends CommonControllerConfig{
    private templateService : TemplateService

    constructor(app: Application, templateService: TemplateService) {
        super(app, "TemplateController");
        this.templateService = templateService;
    }

    configureRoutes() : Application{
        this.app.route(`/templates`)
        .get(async (req: Request, res: Response) => {
            const templates = await this.templateService.list();
            const returnList = templates.map(r=> new TemplatePayload(r.id,r.name,r.formConfig,r.templateFormat))
            res.status(200).send(returnList);
        })
        .post(async (req: Request, res: Response) => {
            const template = await this.templateService.create(req.body);
            res.status(201).send(template);
        });
    //TODO: Implement 404 cases
    this.app.route(`/templates/:id`)
        .get(async (req: Request, res: Response) => {
            const template = await this.templateService.readById(parseInt(req.params.id));
            if (typeof template !== 'undefined' ) {
                res.status(200).send(
                    new TemplatePayload(template.id,template.name,template.formConfig,template.templateFormat));
            } else {
                res.status(404)
            }
        })
        .put(async (req: Request, res: Response) => {
            const responseMessage = await this.templateService.putById(parseInt(req.params.id), req.body)
            res.status(204).send();
        })
        .delete(async (req: Request, res: Response) => {
            const responseMessage = await this.templateService.deleteById(parseInt(req.params.id));
            res.status(204).send();
        });

        //For testing knex
        this.app.use("/health", HealthController);

        return this.app;
    }
}

