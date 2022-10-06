import GithubClient from "../utils/githubClient"
import CloudFormationDeploy from "./deploy/cloudFormationDeploy"

export default class CloudformationService {

    async deploy(client: string) {
        const deployed = await new CloudFormationDeploy().deploy("test",client,[]) as Promise<string>;
        return deployed;
    }
}