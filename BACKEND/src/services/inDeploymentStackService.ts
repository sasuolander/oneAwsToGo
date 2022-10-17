import IInDeploymentStack from "../interfaces/inDeploymentStackInterface";
import InDeploymentStackDao from "../dao/inDeploymentStackDao";
export default class InDeploymentStackService {

    checkDeploymentStatus(stackId : string) {


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