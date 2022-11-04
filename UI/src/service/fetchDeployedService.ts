import Backend from "../utils/backend";

export default class FetchDeployedService {

   getDeployed(){
      return Backend.fetchDeployed();
   }

   async getDeploymentIdByStackId(stackId: string){
      const deployments = await Backend.fetchDeployed();
      let found = false;
      let id = null;
      for (let i = 0; i < deployments.length; i++) {
         if (deployments[i].stackId == stackId) {
            id = deployments[i].id;
            found = true;
         }
      }

      if (!found) {
         return undefined;
      } else {
         return id;
      }
   }

}
