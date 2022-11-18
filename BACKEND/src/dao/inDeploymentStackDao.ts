import IInDeploymentStack from "../interfaces/inDeploymentStackInterface";
import {db} from "../database/configDb";
class InDeploymentStackDao {
    deployedStacks: Array<IInDeploymentStack> = [];
    idCount: number = 1;

    constructor() {
        console.log("InDeploymentStackDao created");

    }

    async addInDeploymentStack(deployedStack: IInDeploymentStack) {
        const newId : any = await db.select(db.raw(`nextval('serial')`)).first();
        deployedStack.status = "CREATE_IN_PROGRESS";
        console.log(newId.nextval);
        deployedStack.id = newId.nextval;
        await db<IInDeploymentStack>("deployed").insert(deployedStack);
        return deployedStack;
    }

    async getInDeploymentStacks() {
        const allDeployed= await db.select("*")
        .from<IInDeploymentStack>("deployed")
        .then();
        return allDeployed;
    }

    async getInDeploymentStackById(inDeploymentStackId: number) {
        const foundDeployed = await db<IInDeploymentStack>("deployed").where("id", inDeploymentStackId).first();
        return foundDeployed;
    }

    async getInDeploymentStackByStackId(stackId: string) {
        const foundDeployed = await db<IInDeploymentStack>("deployed").where("stack_id", stackId).first();
        return foundDeployed;
    }

    async putInDeploymentStackById(deployedStackId: number, deployedStack: IInDeploymentStack) {
        deployedStack.id = deployedStackId;
        const updated = await db("deployed")
        .returning("id")
        .where({id: deployedStackId})
        .update(deployedStack)
        
        return `${deployedStack.id} updated via put`;
    }

    async updateStackStatus(inDeploymentStackId: number, status : string) {
        const updated = await db("deployed")
        .returning("id")
        .where({id: inDeploymentStackId})
        .update('status', status)
        if(updated.length > 0) {
            return true;
        }
        
        return false;
    }

    async removeInDeploymentStackById(deployedId: number) {
        await db("deployed")
        .where({id: deployedId})
        .del()
        return `${deployedId} removed`;
    }

}

export default new InDeploymentStackDao;