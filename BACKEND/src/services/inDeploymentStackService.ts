import IInDeploymentStack from "../interfaces/inDeploymentStackInterface";
import InDeploymentStackDao from "../dao/inDeploymentStackDao";
import StackStatusService from "./deploymentstatus/stackStatusService";
import IStatusPayload from "../interfaces/statusPayloadInterface";
import {DescribeStackEventsCommandOutput} from "@aws-sdk/client-cloudformation";
import deleteTemplate from "./deleteTemplate";

export default class InDeploymentStackService {
    stackStatusService: StackStatusService;

    constructor(stackStatusService: StackStatusService) {
        this.stackStatusService = stackStatusService
    }

    async checkDeploymentStatus(payload: IStatusPayload) {
        const stack = await InDeploymentStackDao.getInDeploymentStackById(payload.id);
        if(stack) {
            const currentStatus : DescribeStackEventsCommandOutput = await this.stackStatusService.checkStatus(stack.stack_id);
            if(currentStatus.StackEvents) {
                //@ts-ignore
                await this.updateDeploymentStatus(stack.id, currentStatus.StackEvents[0].ResourceStatus);
                this.pollStatusUpdate(stack, currentStatus.StackEvents[0].ResourceStatus);
                return currentStatus.StackEvents[0].ResourceStatus;
            }

        }
    }

    async pollStatusUpdate(stack: IInDeploymentStack, status: string | undefined) {

        try {
            while(status !== "CREATE_COMPLETE" && status !== "CREATE_FAILED") {
                await this.timeout(5000)
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

    timeout(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
    async getById(deployedId : number) {
        return InDeploymentStackDao.getInDeploymentStackById(deployedId);
    }

    async deleteByStackId(deployedId: number) {
        return InDeploymentStackDao.removeInDeploymentStackById(deployedId);
    }

    async deleteStack(deployedId: number) {
        const stack = await this.getById(deployedId);
        if (stack !== undefined) {
            const status = await deleteTemplate(stack.stackId)
            if ( status.$metadata.httpStatusCode == 200 ) {
                const currentStatus : DescribeStackEventsCommandOutput = await this.stackStatusService.checkStatus(stack.stackId);
                if (currentStatus !== undefined){
                    // @ts-ignore
                    const statusNow = currentStatus.StackEvents[0].ResourceStatus
                    if (statusNow !== undefined){
                        const finalStatus = await this.pollStatusUpdateDelete(stack,statusNow)
                        console.log("status")
                        if (finalStatus !== undefined ){
                            console.log(finalStatus)
                            await InDeploymentStackDao.removeInDeploymentStackById(deployedId);
                        }

                    }   else{
                        console.log("undefined error")
                    }
                }
            }
        }
    }

    async pollStatusUpdateDelete(stack: IInDeploymentStack, status: string | undefined) : Promise<string | undefined >{
    let deleteStatus: string | undefined
        try {
        console.log("start deleting poll")
            while(status !== "DELETE_COMPLETE") {
                await this.timeout(5000)
                console.log("Polling Delete....");
                const currentStatus : DescribeStackEventsCommandOutput = await this.stackStatusService.checkStatus(stack.stackId);
                if(currentStatus.StackEvents) {
                    //@ts-ignore
                    await this.updateDeploymentStatus(stack.id, currentStatus.StackEvents[0].ResourceStatus);
                    status = currentStatus.StackEvents[0].ResourceStatus;
                    deleteStatus = currentStatus.StackEvents[0].ResourceStatus;
                }
            }
            if (deleteStatus !== undefined){
                return deleteStatus
            }
        }catch(e) {
            console.log(e)
        }

    }

    async list() {
        return InDeploymentStackDao.getInDeploymentStacks();
    }
}
