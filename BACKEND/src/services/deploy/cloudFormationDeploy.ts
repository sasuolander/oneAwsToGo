import IDeploy from "../../interfaces/deployInterface";
import {
    Capability,
    CloudFormationClient,
    CreateStackCommand,
    OnFailure,
    Parameter
} from "@aws-sdk/client-cloudformation";
import {CreateStackCommandInput} from "@aws-sdk/client-cloudformation/dist-types/commands/CreateStackCommand";
import {Credentials, Provider} from "@aws-sdk/types";
import {AwsAuthInputConfig} from "@aws-sdk/middleware-signing";
// await new CloudFormationDeploy().deploy("test",client,[]) as Promise<string>
export default class CloudFormationDeploy implements IDeploy<Promise<any>,Parameter[]> {
    async deploy(deploymentName:string,templateData: string, parameter:Parameter[]): Promise<any> {
        const client = new CloudFormationClient(new Test(new Norm("","")));
        const input = new InputWithParameter(deploymentName,templateData,parameter)
        const command = new CreateStackCommand(input);
        return client.send(command);
    }
}

 class Norm implements Credentials {
     readonly accessKeyId: string;
     readonly secretAccessKey: string;

     constructor(accessKeyId:string,secretAccessKey:string) {
         this.accessKeyId =accessKeyId
         this.secretAccessKey = secretAccessKey
     }
 }

class Test implements  AwsAuthInputConfig{
    credentials?: Credentials | Provider<Credentials>;
    constructor(credentials:Credentials) {
        this.credentials=credentials
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
