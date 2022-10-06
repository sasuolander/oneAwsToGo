import CloudformationService from "../services/cloudformationService";
import { CommonControllerConfig } from "../utils/CommonRoutesConfig";
import {Application, Request, Response, NextFunction} from 'express';
import TemplateService from "../services/templateService";
import ITemplate from "../interfaces/templateInterface";
import GithubClient from "../utils/githubClient";

interface IPostPayload {
    templateName:string
} 
export default class CloudformationController extends CommonControllerConfig{
    private cloudformationService : CloudformationService;

    constructor(app: Application, cloudformationService: CloudformationService) {
        super(app, "CloudformationController");
        this.cloudformationService = cloudformationService;  
    }
    configureRoutes(): Application {
        this.app.route(`/trigger/cloudformation`)
        .post(async (req: Request, res: Response) => {
            const toBeDeployed : IPostPayload = req.body;
            const foundTemplate = await this.findTemplate(toBeDeployed);
        
            if(foundTemplate) {
                const client = await new GithubClient().getTemplate("test","https://raw.githubusercontent.com/sasuolander/templatesAWS/master/S3_Website_Bucket_With_Retain_On_Delete.yaml");
                const deployed = await this.deployTemplate(client);
                res.status(deployed).send();
            } else {
                res.status(404).send();
            }            
        })

        return this.app;
    }

    async findTemplate(toBeDeployed : IPostPayload) : Promise<boolean> {
        const templates = await new TemplateService().list();
        let found = false;
        templates.forEach(template => {
            if(template.name === toBeDeployed.templateName) {
                found = true;
            }
        });
            return found;
    }

    async deployTemplate(template : string) : Promise<number> {
        if(template) {
            try {
                const deploy = await this.cloudformationService.deploy(template);
                console.log(deploy);
                //@ts-ignore
                return deploy['$metadata'].httpStatusCode;
                
            } catch (e) {
                console.log(e);
                return 500;
            }
            
        } else {
            return 404;
        }
    }
    
 }
