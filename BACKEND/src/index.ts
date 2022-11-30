require('dotenv').config()
import express, { Application, Request, Response } from "express";
import {CommonControllerConfig} from './utils/CommonRoutesConfig';
import bodyParser from "body-parser";
import cors from "cors";
import UserController  from "./controllers/userController";
import TemplateController from './controllers/templateController';
import TemplateService from "./services/templateService";
import UserService from "./services/userService";
import TriggerController from "./controllers/triggerController";
import TriggerService from "./services/triggerService";
import GithubClient from "./utils/githubClient";
import InDeploymentStackService from "./services/inDeploymentStackService";
import InDeploymentStackController from "./controllers/deploymentStatusController";
import DeployedService from "./services/deployedService";
import DeployedController from "./controllers/deployedController";
import { logger } from "./utils/logger";
import HealthController from "./controllers/healthController";
import LoginController from "./controllers/loginController";
export const app: Application = express();
const port = process.env.SERVER_PORT;
const routes: Array<CommonControllerConfig> = [];

// Use CORS middleware
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Add routes to the app
const templateService =  new TemplateService()
const deployedService = new DeployedService()
const inDeploymentStackService = new InDeploymentStackService(deployedService)
routes.push(new UserController(app, new UserService()));
routes.push(new TemplateController(app, templateService));
routes.push(new TriggerController(app, new TriggerService(templateService), new GithubClient(), deployedService));
routes.push(new InDeploymentStackController(app, inDeploymentStackService));
routes.push(new DeployedController(app, deployedService));
routes.push(new HealthController(app));
routes.push(new LoginController(app, new UserService()));
app.get("/",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "OneAWStoGo Backend",
        });
    }
);

app.listen(port, () => {
    //Log routes
    routes.forEach((route: CommonControllerConfig) => {
        logger.info(`Routes configured for ${route.getName()}`);
    });
    logger.info(`OneAWStoGo app listening on port ${port}!`)
})
