import Backend from "../utils/backend";

export default class DeployService {
    triggerCreation(id: number, name: string): void {
        Backend.triggerCreation(id, name)
    }
}
