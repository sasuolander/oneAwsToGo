import IDeployedStack from "../interfaces/deployedStackInterface";
import {DescribeStackEventsCommandOutput} from "@aws-sdk/client-cloudformation";
import Utils from "../utils/utils";
import DeployedDao from "../dao/deployedDao";
import AWSCommand from "../utils/AWSCommand";
require('dotenv').config()

export default class DeployedService {

    deployedDao:DeployedDao = new DeployedDao

    constructor() {
    }

    async updateDeploymentStatus(id : number, status : string) {
        return this.deployedDao.updateDeployedStackStatus(id, status);
    }

    async create(deployedStack: IDeployedStack) {
        return this.deployedDao.addDeployedStack(deployedStack);
    }

    async getByStackId(stackId : string) {
        return this.deployedDao.getDeployedStackByStackId(stackId);
    }
    async getById(deployedId : number) {
        return this.deployedDao.getDeployedStackById(deployedId);
    }

    async deleteByStackId(deployedId: number) {
        return this.deployedDao.removeDeployedStackById(deployedId);
    }

    async deleteStack(deployedId: number) {
        const stack = await this.getById(deployedId);
        if (stack !== undefined) {
            const status = await AWSCommand.deleteTemplate(stack.stack_id)
            if ( status.$metadata.httpStatusCode == 200 ) {
                const currentStatus : DescribeStackEventsCommandOutput = await AWSCommand.checkStatus(stack.stack_id);
                if (currentStatus !== undefined){
                    // @ts-ignore
                    const statusNow = currentStatus.StackEvents[0].ResourceStatus
                    if (statusNow !== undefined){
                        const finalStatus = await this.pollStatusUpdateDelete(stack,statusNow)
                        if (finalStatus !== undefined ){
                            console.log(finalStatus)
                            await this.deployedDao.removeDeployedStackById(deployedId);
                        }

                    }   else{
                        console.log("undefined error")
                    }
                }
            }
        }
    }

    async pollStatusUpdateDelete(stack: IDeployedStack, status: string | undefined) : Promise<string | undefined >{
        let deleteStatus: string | undefined
        try {
            while(status !== "DELETE_COMPLETE") {
                await Utils.timeout(Number(process.env.POLLTIMEOUT))
                console.log("Polling Delete....");
                const currentStatus : DescribeStackEventsCommandOutput = await AWSCommand.checkStatus(stack.stack_id);
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
        return this.deployedDao.getDeployedStacks();
    }
}
