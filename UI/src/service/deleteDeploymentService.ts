import Backend from "../utils/backend";

//TODO: Finish, when endpoint works.
export default class DeleteDeploymentService {
    deleteDeployment(id: number): Promise<any> {
        return Backend.deleteDeployment(id);
    }
}
