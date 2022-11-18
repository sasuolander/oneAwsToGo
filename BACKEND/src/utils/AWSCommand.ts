import {
    CloudFormationClient, DeleteStackCommand, DeleteStackCommandInput,
    DescribeStackEventsCommand, DescribeStackEventsCommandInput,
    DescribeStackEventsCommandOutput
} from "@aws-sdk/client-cloudformation";

export default class AWSCommand {
    static async checkStatus(stackId:string): Promise<DescribeStackEventsCommandOutput> {
        const client = new CloudFormationClient({});
        const input = new StackStatusInput(undefined,stackId);
        const command = new DescribeStackEventsCommand(input);
        return client.send(command);
    }
    static deleteTemplate(stackId:string){
        const client = new CloudFormationClient({});
        const input = new InputWithParameter(stackId)
        const command = new DeleteStackCommand(input);
        return client.send(command);
    }
}

class StackStatusInput implements DescribeStackEventsCommandInput {
    NextToken: string |undefined;
    StackName: string | undefined;

    constructor(NextToken:string | undefined, StackName:string) {
        this.NextToken = NextToken;
        this.StackName = StackName;
    }
}

class InputWithParameter implements DeleteStackCommandInput {
    StackName: string;
    constructor(StackName: string) {
        this.StackName = StackName;
    }
}
