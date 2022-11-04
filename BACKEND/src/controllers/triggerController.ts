import TriggerService from "../services/triggerService";
import {CommonControllerConfig} from "../utils/CommonRoutesConfig";
import {Application, Request, Response} from 'express';
import GithubClient from "../utils/githubClient";
import IPostPayload from "../interfaces/postpayloadinterface";
import CloudFormationDeploy, {Output} from "../services/deploy/cloudFormationDeploy";
import ITemplate, {TemplateFormat, TemplateInput, Template} from "../interfaces/templateInterface";
import InDeploymentStackService from "../services/inDeploymentStackService";
import IInDeploymentStack from "../interfaces/inDeploymentStackInterface";
import { AlreadyExistsException } from "@aws-sdk/client-cloudformation";

interface IDeploymentResult {
    httpStatus: number | undefined,
    deploymentId:string | undefined,
    errorMessage: string | undefined
}


export default class TriggerController extends CommonControllerConfig {
    private triggerService: TriggerService;
    private githubClient: GithubClient;
    private deployedStackService : InDeploymentStackService;

    constructor(app: Application, triggerService: TriggerService, githubClient: GithubClient, deployedStackService: InDeploymentStackService) {
        super(app, "TriggerController");
        this.triggerService = triggerService;
        this.githubClient = githubClient;
        this.deployedStackService = deployedStackService;
    }

    configureRoutes(): Application {
        this.app.route(`/trigger`)
            .post(async (req: Request, res: Response) => {
                const toBeInDeployment: IPostPayload = req.body;
                const foundTemplate = await this.triggerService.findTemplate(toBeInDeployment);
                if (foundTemplate.found) {
                    const data = foundTemplate.data as ITemplate;
                    const templateSourceCode = await this.githubClient.getTemplate(data.url);
                    const template = new TemplateInput(data.id, data.name, data.templateFormat, templateSourceCode, data.url)
                    const deployed = await this.deployTemplate(toBeInDeployment.deploymentName, template,toBeInDeployment.parameters);
                    if (deployed.httpStatus) {
                        res.status(deployed.httpStatus).send(deployed);

                    } else {
                        res.status(500).send("Something failed")
                    }
                } else {
                    res.status(404).send();
                }
            })

        return this.app;
    }

    async deployTemplate(name: string, template: TemplateInput,parameters:any): Promise<IDeploymentResult> {
        if (typeof template !== "undefined") {
            try {
                switch (template.templateFormat) {
                    case TemplateFormat.CloudFormation:
                        try{
                            const deploy = await this.triggerService.deployTemplate<Output>(name, template.templateSourceCode,parameters, new CloudFormationDeploy);
                            console.log(deploy);
                            const newDeployment = {name: name, stackId: deploy.StackId} as IInDeploymentStack;
                            this.deployedStackService.create(newDeployment);
                            return {httpStatus: deploy.$metadata.httpStatusCode, deploymentId: deploy.StackId, errorMessage: undefined};
                        } catch (e:any) {
                            console.log(e)
                            return {httpStatus: 500, deploymentId:undefined, errorMessage: e.message}
                               
                        }                    
                            

                    case TemplateFormat.CDK:
                        throw  Error("Not Implemented")
                    case TemplateFormat.TerraForm:
                        throw  Error("Not Implemented")
                    default :
                        throw  Error("Unknown type")
                }
            } catch (e:any) {
                console.log(e);
                return {httpStatus: 500, deploymentId:undefined, errorMessage: e.message};
            }

        } else {
            return {httpStatus: 404, deploymentId:undefined, errorMessage: undefined};
        }
    }

}
