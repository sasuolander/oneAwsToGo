import IInDeploymentStack from "../interfaces/inDeploymentStackInterface";
import deleteTemplate from "./deleteTemplate";
import {DescribeStackEventsCommandOutput} from "@aws-sdk/client-cloudformation";
import Utils from "../utils/utils";
import DeployedDao from "../dao/deployedDao";
import StackStatusService from "./deploymentstatus/stackStatusService";
require('dotenv').config()

export default class DeployedService {

    stackStatusService: StackStatusService;
    deployedDao:DeployedDao = new DeployedDao

    constructor(stackStatusService: StackStatusService) {
        this.stackStatusService = stackStatusService
    }

    async updateDeploymentStatus(id : number, status : string) {
        return this.deployedDao.updateStackStatus(id, status);
    }

    async create(deployedStack: IInDeploymentStack) {
        return this.deployedDao.addInDeploymentStack(deployedStack);
    }

    async getByStackId(stackId : string) {
        return this.deployedDao.getInDeploymentStackByStackId(stackId);
    }
    async getById(deployedId : number) {
        return this.deployedDao.getInDeploymentStackById(deployedId);
    }

    async deleteByStackId(deployedId: number) {
        return this.deployedDao.removeInDeploymentStackById(deployedId);
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
                        if (finalStatus !== undefined ){
                            console.log(finalStatus)
                            await this.deployedDao.removeInDeploymentStackById(deployedId);
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
                await Utils.timeout(Number(process.env.POLLTIMEOUT))
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
        return this.deployedDao.getInDeploymentStacks();
    }
}
