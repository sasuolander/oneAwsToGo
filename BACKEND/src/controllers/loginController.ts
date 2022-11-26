import {CommonControllerConfig} from '../utils/CommonRoutesConfig';
import {Application, Request, Response} from 'express';
import UserService from '../services/userService';
import { logger } from '../utils/logger';

interface ILoginPayload {
    username:string
    password:string
}

export default class LoginController extends CommonControllerConfig {
    private userService : UserService

    constructor(app: Application, userService: UserService) {
        super(app, 'LoginRoutes');
        this.userService = userService;
    }

    
    configureRoutes() : Application {
        this.app.route(`/login`)
        .post(async (req: Request, res: Response) => {
            const logInfo = req.body as ILoginPayload;
            const logUserIn = await this.userService.checkCredentials(logInfo.username,logInfo.password);
            if(logUserIn) {
                logger.info("Logged user " + logInfo.username + " in");
                res.status(200).send();
            } else {
                res.status(404).send("User with this username/password combination doesn't exist");
            }
            
        });
        return this.app;
    }

}

