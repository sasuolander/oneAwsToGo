import { Knex } from "knex";
require('dotenv').config()
export interface Config {
    environment:string;
    database: Knex.PgConnectionConfig;
}
export function getConfigDB(): Config {
    console.log("getConfigDB")
    console.log(process.env.dbPassword)
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
