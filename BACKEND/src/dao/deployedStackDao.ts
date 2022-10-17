import IDeployedStack from "../interfaces/deployedStackInterface";

class DeployedStackDao {
    deployedStacks: Array<IDeployedStack> = [];
    idCount: number = 1;

    constructor() {
        console.log("DeployedStackDao created");

    }

    async addDeployedStack(deployedStack: IDeployedStack) {
        deployedStack.id = this.idCount;
        this.deployedStacks.push(deployedStack);
        this.idCount++;
        return deployedStack;
    }

    async getDeployedStacks() {
        return this.deployedStacks;
    }

    async getDeployedStackById(DeployedStackId: number) {
        return this.deployedStacks.find((DeployedStack: { id: number }) => DeployedStack.id === DeployedStackId);
    }

    async getDeployedStackByStackId(stackId: string) {
        return this.deployedStacks.find((DeployedStack: { stackId: string }) => DeployedStack.stackId === stackId);
    }

    async putDeployedStackById(deployedStackId: number, deployedStack: IDeployedStack) {
        const objIndex = this.deployedStacks.findIndex(
            obj => obj.id === deployedStackId
        );
        deployedStack.id = deployedStackId;
        this.deployedStacks.splice(objIndex, 1, deployedStack);
        return `${deployedStack.id} updated via put`;
    }

    async removeDeployedStackById(deployedStackId: number) {
        const objIndex = this.deployedStacks.findIndex(
            (obj: { id: number }) => obj.id === deployedStackId
        );
        this.deployedStacks.splice(objIndex, 1);
        return `${deployedStackId} removed`;
    }

}

export default new DeployedStackDao;