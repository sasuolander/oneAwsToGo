import { NextFunction, Request, Response, Application } from "express";
import { db } from "../database/configDb";
import {CommonControllerConfig} from '../utils/CommonRoutesConfig';

export default class HealthController extends CommonControllerConfig {


  constructor(app: Application) {
      super(app, 'HealthController');

  }

  configureRoutes() : Application {
      this.app.route(`/health`)
      .get(async (req: Request, res: Response) => {

        try {
          await db.from("information_schema.tables").select();
          res.sendStatus(204);
        } catch (error) {
          res.sendStatus(500);
        }
      })


      return this.app;
  }

}