import IInDeploymentStack from "../interfaces/inDeploymentStackInterface";

class InDeploymentStackDao {
    deployedStacks: Array<IInDeploymentStack> = [];
    idCount: number = 1;

    constructor() {
        console.log("InDeploymentStackDao created");

    }

    async addInDeploymentStack(deployedStack: IInDeploymentStack) {
        deployedStack.id = this.idCount;
        this.deployedStacks.push(deployedStack);
        this.idCount++;
        return deployedStack;
    }

    async getInDeploymentStacks() {
        return this.deployedStacks;
    }

    async getInDeploymentStackById(InDeploymentStackId: number) {
        return this.deployedStacks.find((InDeploymentStack: { id: number }) => InDeploymentStack.id === InDeploymentStackId);
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

    async removeInDeploymentStackById(deployedStackId: number) {
        const objIndex = this.deployedStacks.findIndex(
            (obj: { id: number }) => obj.id === deployedStackId
        );
        this.deployedStacks.splice(objIndex, 1);
        return `${deployedStackId} removed`;
    }

}

export default new InDeploymentStackDao;