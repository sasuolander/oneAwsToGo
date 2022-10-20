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

export class CloudFormationDeployError extends Error{
    constructor(msg:string) {
        super(msg);
    }
}

export default class CloudFormationDeploy implements IDeploy<Promise<any>, Parameter[]> {
    async deploy(deploymentName: string, templateData: string, parameter: any): Promise<any> {
        let parameterList: Parameter[] = []

        if (typeof parameter !== "undefined" && Array.isArray(parameter)) {
            if (parameter.length > 0) {
                parameterList = parameter.map((r: { field_id: any; field_value: any; }) => {
                    return {ParameterKey: r.field_id, ParameterValue: r.field_value} as Parameter
                })
            }
        } else {
            throw new CloudFormationDeployError("Parameter is in wrong format")
        }
        console.log("rawParameter",parameter)
        console.log("parameterConverted",parameterList)
        const client = new CloudFormationClient({});
        const input = new InputWithParameter(deploymentName, templateData, parameterList)
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
