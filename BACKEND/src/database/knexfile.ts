import { Knex } from "knex";
import { db, getConfigDB } from "./configDb";

require('dotenv').config()

module.exports = {
  client: "pg",
  connection: getConfigDB(),
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
} as Knex.Config;