import Backend from "../utils/backend";

export default class FetchDeployedService {

   getDeployed(){
      return Backend.fetchDeployed();
   }

}
