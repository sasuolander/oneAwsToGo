import IDeployed from "../interfaces/inDeploymentStackInterface";
import {db} from "../database/configDb";
export default class DeployedDao {

    constructor() {
        console.log("DeployedDao created");
    }

    async addDeployedStack(deployedStack: IDeployed) {
        const newId : any = await db.select(db.raw(`nextval('serial')`)).first();
        deployedStack.status = "CREATE_IN_PROGRESS";
        console.log(newId.nextval);
        deployedStack.id = newId.nextval;
        await db<IDeployed>("deployed").insert(deployedStack);
        return deployedStack;
    }

    async getDeployedStacks() {
        const allDeployed= await db.select("*")
        .from<IDeployed>("deployed")
        .then();
        return allDeployed;
    }

    async getDeployedStackById(inDeploymentStackId: number) {
        const foundDeployed = await db<IDeployed>("deployed").where("id", inDeploymentStackId).first();
        return foundDeployed;
    }

    async getDeployedStackByStackId(stackId: string) {
        const foundDeployed = await db<IDeployed>("deployed").where("stack_id", stackId).first();
        return foundDeployed;
    }

    async putDeployedStackById(deployedStackId: number, deployedStack: IDeployed) {
        deployedStack.id = deployedStackId;
        const updated = await db("deployed")
        .returning("id")
        .where({id: deployedStackId})
        .update(deployedStack)

        return `${deployedStack.id} updated via put`;
    }

    async updateDeployedStackStatus(inDeploymentStackId: number, status : string) {
        const updated = await db("deployed")
        .returning("id")
        .where({id: inDeploymentStackId})
        .update('status', status)
        if(updated.length > 0) {
            return true;
        }

        return false;
    }

    async removeDeployedStackById(deployedId: number) {
        await db("deployed")
        .where({id: deployedId})
        .del()
        return `${deployedId} removed`;
    }

}
