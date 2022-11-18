import Backend from "../utils/backend";

export default class DeleteDeploymentService {
    deleteDeployment(id: number): Promise<any> {
        return Backend.deleteDeployment(id);
    }
}
