import IDeployedStack from "../interfaces/deployedStackInterface";
import IStatusPayload from "../interfaces/statusPayloadInterface";
import {DescribeStackEventsCommandOutput} from "@aws-sdk/client-cloudformation";
import Utils from "../utils/utils";
import DeployedService from "./deployedService";
import AWSCommand from "../utils/AWSCommand";
import { logger } from "../utils/logger";
require('dotenv').config()

export default class InDeploymentStackService {
    deployedService: DeployedService;

    constructor( deployedService:DeployedService) {

        this.deployedService=deployedService
    }

    async checkDeploymentStatus(payload: IStatusPayload) {
        const stack = await this.deployedService.getById(payload.id);
        if(stack) {
            const currentStatus : DescribeStackEventsCommandOutput = await AWSCommand.checkStatus(stack.stack_id);
            if(currentStatus.StackEvents) {
                // @ts-ignore
                await this.deployedService.updateDeploymentStatus(stack.id, currentStatus.StackEvents[0].ResourceStatus);
                this.pollStatusUpdate(stack, currentStatus.StackEvents[0].ResourceStatus);
                return currentStatus.StackEvents[0].ResourceStatus;
            }

        }
    }

    async pollStatusUpdate(stack: IDeployedStack, status: string | undefined) {

        try {
            while(status !== "CREATE_COMPLETE" && status !== "CREATE_FAILED") {
                await Utils.timeout(Number(process.env.POLLTIMEOUT))
                logger.info("Polling....");
                const currentStatus : DescribeStackEventsCommandOutput = await AWSCommand.checkStatus(stack.stack_id);
                if(currentStatus.StackEvents) {
                    // @ts-ignore
                    await this.deployedService.updateDeploymentStatus(stack.id, currentStatus.StackEvents[0].ResourceStatus);
                    status = currentStatus.StackEvents[0].ResourceStatus;
                }
            }
        }catch(e) {
           logger.error(e);
        }

    }
}
