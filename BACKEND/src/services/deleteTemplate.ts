import {
    CloudFormationClient,
    DeleteStackCommand,
    DeleteStackCommandInput,
} from "@aws-sdk/client-cloudformation";

export default function deleteTemplate(stackId:string){
    const client = new CloudFormationClient({});
    const input = new InputWithParameter(stackId)
    const command = new DeleteStackCommand(input);
    return client.send(command);
}

class InputWithParameter implements DeleteStackCommandInput {
    StackName: string;
    constructor(StackName: string) {
        this.StackName = StackName;
    }
}
