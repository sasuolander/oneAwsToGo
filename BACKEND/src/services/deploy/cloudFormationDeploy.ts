import IDeploy from "../../interfaces/deployInterface";
import {
    Capability,
    CloudFormationClient,
    CreateStackCommand,
    OnFailure,
    Parameter
} from "@aws-sdk/client-cloudformation";
import {CreateStackCommandInput} from "@aws-sdk/client-cloudformation/dist-types/commands/CreateStackCommand";
import {MetadataBearer} from "@aws-sdk/types";
import {CreateStackOutput} from "@aws-sdk/client-cloudformation/dist-types/models/models_0";

export interface Output extends CreateStackOutput,MetadataBearer{}

export default class CloudFormationDeploy implements IDeploy<Promise<any>,Parameter[]> {
    async deploy(deploymentName:string,templateData: string, parameter:Parameter[]): Promise<any> {
        const client = new CloudFormationClient({});
        const input = new InputWithParameter(deploymentName,templateData,parameter)
        const command = new CreateStackCommand(input);
        return client.send(command);
    }
}

class MinimalInput implements CreateStackCommandInput {
    Capabilities: (Capability | string)[] = [Capability.CAPABILITY_NAMED_IAM];
    OnFailure: OnFailure | string =OnFailure.DELETE;
    StackName: string;
    TemplateBody: string;

    constructor(StackName: string, TemplateBody: string) {
        this.StackName = StackName;
        this.TemplateBody = TemplateBody;
    }
}

class InputWithParameter implements CreateStackCommandInput {
    Capabilities: (Capability | string)[] = [Capability.CAPABILITY_NAMED_IAM];
    OnFailure: OnFailure | string = OnFailure.DELETE;
    StackName: string;
    TemplateBody: string;
    Parameters: Parameter[];
    constructor(StackName: string, TemplateBody: string,Parameters:Parameter[]) {
        this.StackName = StackName;
        this.TemplateBody = TemplateBody;
        this.Parameters = Parameters;
    }
}
