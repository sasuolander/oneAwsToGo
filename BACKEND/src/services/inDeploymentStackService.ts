import IInDeploymentStack from "../interfaces/inDeploymentStackInterface";
import StackStatusService from "./deploymentstatus/stackStatusService";
import IStatusPayload from "../interfaces/statusPayloadInterface";
import {DescribeStackEventsCommandOutput} from "@aws-sdk/client-cloudformation";
import Utils from "../utils/utils";
import DeployedDao from "../dao/deployedDao";
require('dotenv').config()

export default class InDeploymentStackService {
    stackStatusService: StackStatusService;
    deployedDao:DeployedDao = new DeployedDao()

    constructor(stackStatusService: StackStatusService) {
        this.stackStatusService = stackStatusService
    }

    async checkDeploymentStatus(payload: IStatusPayload) {
        const stack = await this.deployedDao.getInDeploymentStackById(payload.id);
        if(stack) {
            const currentStatus : DescribeStackEventsCommandOutput = await this.stackStatusService.checkStatus(stack.stack_id);
            if(currentStatus.StackEvents) {
                //@ts-ignore
                await this.updateDeploymentStatus(stack.id, currentStatus.StackEvents[0].ResourceStatus);
                await this.pollStatusUpdate(stack, currentStatus.StackEvents[0].ResourceStatus);
                return currentStatus.StackEvents[0].ResourceStatus;
            }

        }
    }

    async pollStatusUpdate(stack: IInDeploymentStack, status: string | undefined) {

        try {
            while(status !== "CREATE_COMPLETE" && status !== "CREATE_FAILED") {
                console.log("loop")
                console.log(process.env.POLLTIMEOUT)
                await Utils.timeout(Number(process.env.POLLTIMEOUT))
                console.log("Polling....");
                const currentStatus : DescribeStackEventsCommandOutput = await this.stackStatusService.checkStatus(stack.stack_id);
                if(currentStatus.StackEvents) {
                    //@ts-ignore
                    await this.updateDeploymentStatus(stack.id, currentStatus.StackEvents[0].ResourceStatus);
                    status = currentStatus.StackEvents[0].ResourceStatus;
                }
            }
        }catch(e) {
            console.log(e)
        }

    }
}
