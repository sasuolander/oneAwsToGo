import TriggerService from "../services/triggerService";
import {CommonControllerConfig} from "../utils/CommonRoutesConfig";
import {Application, Request, Response} from 'express';
import GithubClient from "../utils/githubClient";
import IPostPayload from "../interfaces/postpayloadinterface";
import CloudFormationDeploy, {Output} from "../services/deploy/cloudFormationDeploy";
import ITemplate, {Template, TemplateFormat} from "../interfaces/templateInterface";

interface IDeploymentResult {
    httpStatus: number | undefined,
    deploymentId:string | undefined
}

export default class TriggerController extends CommonControllerConfig {
    private triggerService: TriggerService;
    private githubClient: GithubClient;

    constructor(app: Application, triggerService: TriggerService, githubClient: GithubClient) {
        super(app, "TriggerController");
        this.triggerService = triggerService;
        this.githubClient = githubClient;
    }

    configureRoutes(): Application {
        this.app.route(`/trigger`)
            .post(async (req: Request, res: Response) => {
                const toBeDeployed: IPostPayload = req.body;
                const foundTemplate = await this.triggerService.findTemplate(toBeDeployed);
                if (foundTemplate.found) {
                    const data = foundTemplate.data as ITemplate
                    const templateSourceCode = await this.githubClient.getTemplate(data.url);
                    const template = new Template(data.id, data.name, data.templateFormat, templateSourceCode, data.url,"")
                    const deployed = await this.deployTemplate(toBeDeployed.deploymentName, template,toBeDeployed.parameters);
                    if (deployed.httpStatus == 200) {
                        res.status(deployed.httpStatus).send(deployed);
                    }
                } else {
                    res.status(404).send();
                }
            })

        return this.app;
    }

    async deployTemplate(name: string, template: Template,parameters:any): Promise<IDeploymentResult> {
        if (typeof template !== "undefined") {
            try {
                switch (template.templateFormat) {
                    case TemplateFormat.CloudFormation:
                        const deploy = await this.triggerService.deployTemplate<Output>(name, template.templateSourceCode,parameters, new CloudFormationDeploy);
                        return {httpStatus: deploy.$metadata.httpStatusCode, deploymentId: deploy.StackId};
                    case TemplateFormat.CDK:
                        throw  Error("Not Implemented")
                    case TemplateFormat.TerraForm:
                        throw  Error("Not Implemented")
                    default :
                        throw  Error("Unknown type")
                }
            } catch (e) {
                console.log(e);
                return {httpStatus: 500, deploymentId:undefined};
            }

        } else {
            return {httpStatus: 404, deploymentId:undefined};
        }
    }

}
