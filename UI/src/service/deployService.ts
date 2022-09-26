import Backend from "../utils/backend";

export default class DeployService {

     makeComeCall(input:string): string {
        return Backend.testCall(input)
     }
}
