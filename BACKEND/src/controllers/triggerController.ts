import TriggerService from "../services/triggerService";
import {CommonControllerConfig} from "../utils/CommonRoutesConfig";
import {Application, Request, Response} from 'express';
import GithubClient from "../utils/githubClient";
import IPostPayload from "../interfaces/postpayloadinterface";
import CloudFormationDeploy, {Output} from "../services/deploy/cloudFormationDeploy";
import ITemplate, {TemplateFormat, TemplateInput} from "../interfaces/templateInterface";
import InDeploymentStackService from "../services/inDeploymentStackService";
import IInDeploymentStack from "../interfaces/inDeploymentStackInterface";
import TerraformDeploy from "../services/deploy/terraformDeploy";

interface IDeploymentResult {
    httpStatus: number | undefined,
    deploymentId:string | undefined,
    errorMessage: string | undefined,
    id: number | undefined
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
                    let templateSourceCode: string
                    if (data.templateFormat == TemplateFormat.TerraForm) {
                        templateSourceCode = await this.githubClient.getTemplate(data.url,true,data.name);
                    }else{
                        templateSourceCode = await this.githubClient.getTemplate(data.url);
                    }

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
                            return {httpStatus: deploy.$metadata.httpStatusCode, deploymentId: deploy.StackId, errorMessage: undefined, id: newDeployment.id};
                        } catch (e:any) {
                            console.log(e)
                            return {httpStatus: 500, deploymentId:undefined, errorMessage: e.message, id: undefined}

                        }


                    case TemplateFormat.CDK:
                        throw  Error("Not Implemented")
                    case TemplateFormat.TerraForm:
                        try{
                            const deploy = await this.triggerService.deployTemplate<Output>(name, template.templateSourceCode,parameters, new TerraformDeploy());
                            console.log(deploy);
                            //const newDeployment = {name: name, stackId: deploy.StackId} as IInDeploymentStack;
                            //this.deployedStackService.create(newDeployment);
                           // return {httpStatus: deploy.$metadata.httpStatusCode, deploymentId: deploy.StackId, errorMessage: undefined, id: newDeployment.id};
                            return {httpStatus: 500, deploymentId:undefined, errorMessage: "test", id: undefined}
                        } catch (e:any) {
                            console.log(e)
                            return {httpStatus: 500, deploymentId:undefined, errorMessage: e.message, id: undefined}

                        }
                    default :
                        throw  Error("Unknown type")
                }
            } catch (e:any) {
                console.log(e);
                return {httpStatus: 500, deploymentId:undefined, errorMessage: e.message, id:undefined};
            }

        } else {
            return {httpStatus: 404, deploymentId:undefined, errorMessage: undefined, id:undefined};
        }
    }

}
