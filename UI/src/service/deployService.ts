import Backend, {IDeploymentResult} from "../utils/backend";

export default class DeployService {
    triggerCreation(id: number, name: string,parameters:string): Promise<IDeploymentResult> {
        return Backend.triggerCreation(id, name,parameters)
    }
}
