import Backend from "../utils/backend";

export default class DeploymentStatusService {
    fetchDeploymentStatus(id: Number): Promise<any> {
        return Backend.fetchDevelopmentStatus(id);
    }
}
