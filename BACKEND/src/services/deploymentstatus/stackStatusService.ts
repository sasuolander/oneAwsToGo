import { CloudFormationClient, DescribeStackEventsCommand, DescribeStackEventsCommandInput, DescribeStackEventsCommandOutput } from "@aws-sdk/client-cloudformation";

export default class StackStatusService  {
    async checkStatus(stackId:string): Promise<DescribeStackEventsCommandOutput> {
        const client = new CloudFormationClient({});
        const input = new StackStatusInput(undefined,stackId);
        const command = new DescribeStackEventsCommand(input);
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
