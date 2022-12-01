import Backend from "../utils/backend";

export default class LoginService{

   sendCredentials(username: string, password: string): Promise<any> {
      return Backend.sendCredentials(username, password);
   }

}
