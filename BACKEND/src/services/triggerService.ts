import GithubClient from "../utils/githubClient"
import CloudFormationDeploy from "./deploy/cloudFormationDeploy"
import TemplateService from "./templateService";
import IPostPayload from "../interfaces/postpayloadinterface";

export default class TriggerService {

    async deploy(client: string) {
        const deployed = await new CloudFormationDeploy().deploy("test",client,[]) as Promise<string>;
        return deployed;
    }

    async findTemplate(toBeDeployed : IPostPayload, templateService : TemplateService) : Promise<boolean> {
        const templates = await templateService.list();
        let found = false;
        templates.forEach(template => {
            if(template.name === toBeDeployed.templateName) {
                found = true;
            }
        });
            return found;
    }
}
