import IDeployedStack from "../interfaces/deployedStackInterface";
import DeployedStackDao from "../dao/deployedStackDao";
export default class DeployedStackService {

    checkDeploymentStatus(stackId : string) {


    }
    async create(deployedStack: IDeployedStack) {
        return DeployedStackDao.addDeployedStack(deployedStack);
    }

    async getByStackId(stackId : string) {
        return DeployedStackDao.getDeployedStackByStackId(stackId);
    }

    async list() {
        return DeployedStackDao.getDeployedStacks();
    }
}