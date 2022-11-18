import {Knex} from "knex";
import {getConfigDB} from "./src/database/configDb";

module.exports = {
    client: "pg",
    connection: getConfigDB().database,
    migrations: {
        directory: "./src/database/migrations",
    },
    seeds: {
        directory: "./src/database/seeds",
    },
} as Knex.Config;
