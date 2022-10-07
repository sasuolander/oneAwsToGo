import CloudformationService from "../services/cloudformationService";
import { CommonControllerConfig } from "../utils/CommonRoutesConfig";
import {Application, Request, Response, NextFunction} from 'express';
import TemplateService from "../services/templateService";
import ITemplate from "../interfaces/templateInterface";
import GithubClient from "../utils/githubClient";
import IPostPayload from "../interfaces/postpayloadinterface";

export default class CloudformationController extends CommonControllerConfig{
    private cloudformationService : CloudformationService;
    private githubClient : GithubClient;

    constructor(app: Application, cloudformationService: CloudformationService, githubClient : GithubClient) {
        super(app, "CloudformationController");
        this.cloudformationService = cloudformationService;
        this.githubClient = githubClient;
    }
    configureRoutes(): Application {
        this.app.route(`/trigger/cloudformation`)
        .post(async (req: Request, res: Response) => {
            const toBeDeployed : IPostPayload = req.body;
            const foundTemplate = await this.cloudformationService.findTemplate(toBeDeployed, new TemplateService);
        
            if(foundTemplate) {
                const template = await this.githubClient.getTemplate("test","https://raw.githubusercontent.com/sasuolander/templatesAWS/master/S3_Website_Bucket_With_Retain_On_Delete.yaml");
                const deployed = await this.deployTemplate(template);
                res.status(deployed).send("Stack deployed");
            } else {
                res.status(404).send();
            }            
        })

        return this.app;
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
