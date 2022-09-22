import express, { Application, Request, Response } from "express";

import bodyParser from "body-parser";
import cors from "cors";

const app: Application = express();
const port = 3000;

// Use CORS middleware 
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "OneAWStoGo Backend",
        });
    }
);

app.listen(port, () => console.log(`OneAWStoGo app listening on port ${port}!`))