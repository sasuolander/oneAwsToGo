import Backend, {DeploymentResult} from "../utils/backend";

export default class DeployService {
    triggerCreation(id: number, name: string): Promise<DeploymentResult> {
        return Backend.triggerCreation(id, name)
    }
}
