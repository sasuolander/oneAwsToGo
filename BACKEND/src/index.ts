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
import StackStatusService from "./services/deploymentstatus/stackStatusService";
import StackController from "./controllers/stackController";

export const app: Application = express();
const port = process.env.SERVER_PORT;
const routes: Array<CommonControllerConfig> = [];

// Use CORS middleware
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Add routes to the app
routes.push(new UserController(app, new UserService()));
routes.push(new TemplateController(app, new TemplateService()));
routes.push(new TriggerController(app, new TriggerService( new TemplateService), new GithubClient(), new InDeploymentStackService(new StackStatusService)));
routes.push(new InDeploymentStackController(app, new InDeploymentStackService(new StackStatusService)));
routes.push(new StackController(app, new InDeploymentStackService(new StackStatusService)));

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
        console.log(`Routes configured for ${route.getName()}`);
    });
    console.log(`OneAWStoGo app listening on port ${port}!`)
})
