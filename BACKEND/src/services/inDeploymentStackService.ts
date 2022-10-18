import IInDeploymentStack from "../interfaces/inDeploymentStackInterface";
import InDeploymentStackDao from "../dao/inDeploymentStackDao";
import StackStatusService from "./deploymentstatus/stackStatusService";
export default class InDeploymentStackService {
    stackStatusService: StackStatusService;

    constructor(stackStatusService: StackStatusService) {
        this.stackStatusService = stackStatusService
    }

    async checkDeploymentStatus(id : string) {
        const stack = await InDeploymentStackDao.getInDeploymentStackById(parseInt(id));
        if(stack) {
            return this.stackStatusService.checkStatus(stack.stackId);
        }
        
    }

    async changeDeploymentStatus(id : number, status : string) {
        return await InDeploymentStackDao.changeStackStatus(id, status);
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