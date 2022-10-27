import IInDeploymentStack from "../interfaces/inDeploymentStackInterface";
import InDeploymentStackDao from "../dao/inDeploymentStackDao";
import StackStatusService from "./deploymentstatus/stackStatusService";
import IStatusPayload from "../interfaces/statusPayloadInterface";
import {DescribeStackEventsCommandOutput} from "@aws-sdk/client-cloudformation";

export default class InDeploymentStackService {
    stackStatusService: StackStatusService;

    constructor(stackStatusService: StackStatusService) {
        this.stackStatusService = stackStatusService
    }

    async checkDeploymentStatus(payload: IStatusPayload) {
        const stack = await InDeploymentStackDao.getInDeploymentStackById(payload.id);
        if(stack) {
            const currentStatus : DescribeStackEventsCommandOutput = await this.stackStatusService.checkStatus(stack.stackId);
            if(currentStatus.StackEvents) {
                //@ts-ignore
                await this.updateDeploymentStatus(stack.id, currentStatus.StackEvents[0].ResourceStatus);
                return currentStatus.StackEvents[0].ResourceStatus;
            }
            
        }
    }

    async updateDeploymentStatus(id : number, status : string) {
        return await InDeploymentStackDao.updateStackStatus(id, status);
    }

    async create(deployedStack: IInDeploymentStack) {
        return InDeploymentStackDao.addInDeploymentStack(deployedStack);
    }

    async getByStackId(stackId : string) {
        return InDeploymentStackDao.getInDeploymentStackByStackId(stackId);
    }

    async list() {
        return InDeploymentStackDao.getInDeploymentStacks();
    }
}