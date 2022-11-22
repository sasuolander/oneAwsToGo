import { NextFunction, Request, Response } from "express";
import { db } from "../database/configDb";
import { logger } from "../utils/logger";

export async function HealthController(
  _request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await db.from("information_schema.tables").select();
    logger.info("Health check is OK");
    response.sendStatus(204);
  } catch (error) {
    logger.error(error);
  }
}