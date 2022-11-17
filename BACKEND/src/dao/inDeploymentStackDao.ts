import IInDeploymentStack from "../interfaces/inDeploymentStackInterface";

class InDeploymentStackDao {
    deployedStacks: Array<IInDeploymentStack> = [];
    idCount: number = 1;

    constructor() {
        console.log("InDeploymentStackDao created");

    }

    async addInDeploymentStack(deployedStack: IInDeploymentStack) {
        //TODO: Create enum for stack status
        deployedStack.id = this.idCount;
        deployedStack.status = "Deployment started";
        this.deployedStacks.push(deployedStack);
        this.idCount++;
        return deployedStack;
    }

    async getInDeploymentStacks() {
        return this.deployedStacks;
    }

    async getInDeploymentStackById(inDeploymentStackId: number) {
        return this.deployedStacks.find((InDeploymentStack: { id: number }) => InDeploymentStack.id === inDeploymentStackId);
    }

    async getInDeploymentStackByStackId(stackId: string) {
        return this.deployedStacks.find((InDeploymentStack: { stackId: string }) => InDeploymentStack.stackId === stackId);
    }

    async putInDeploymentStackById(deployedStackId: number, deployedStack: IInDeploymentStack) {
        const objIndex = this.deployedStacks.findIndex(
            obj => obj.id === deployedStackId
        );
        deployedStack.id = deployedStackId;
        this.deployedStacks.splice(objIndex, 1, deployedStack);
        return `${deployedStack.id} updated via put`;
    }

    async updateStackStatus(inDeploymentStackId: number, status : string) {
        const stack = this.deployedStacks.find((InDeploymentStack: { id: number }) => InDeploymentStack.id === inDeploymentStackId);
        if(stack) {
            stack.status = status;
            return true;
        }
        return false;
    }

    async removeInDeploymentStackById(deployedId: number) {
        const objIndex = this.deployedStacks.findIndex(
            (obj: { id: number }) => obj.id === deployedId
        );
        this.deployedStacks.splice(objIndex, 1);
        return `${deployedId} removed`;
    }

}

export default new InDeploymentStackDao;
