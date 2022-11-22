import { Knex } from "knex";
require('dotenv').config();
import { logger } from "../utils/logger";
export interface Config {
    environment:string;
    database: Knex.PgConnectionConfig;
}
export function getConfigDB(): Config {
    logger.info("getConfigDB")
    return {
        environment: "local",
        // ...
        database: {
            user: process.env.dbUser,
            host: process.env.dbHost,
            database: process.env.dbDatabase,
            port: Number(process.env.dbPort),
            password: process.env.dbPassword,
            ssl: false,
        },
    };
}

export const db = require("knex")({
    client: "pg",
    connection: getConfigDB().database,
}) as Knex;
