import express, { Application, Request, Response } from "express";
import {CommonRoutesConfig} from './utils/CommonRoutesConfig';
import bodyParser from "body-parser";
import cors from "cors";
import { UserRoutes } from "./routes/user.routes";
import {TemplateRoutes} from './routes/template.routes';

const app: Application = express();
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];

// Use CORS middleware 
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes.push(new UserRoutes(app));
routes.push(new TemplateRoutes(app));

app.get("/",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "OneAWStoGo Backend",
        });
    }
);

app.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
    console.log(`OneAWStoGo app listening on port ${port}!`)
})