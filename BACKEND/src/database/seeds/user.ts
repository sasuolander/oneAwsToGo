import { Knex } from "knex";
import ITemplate, {TemplateFormat} from "../../interfaces/templateInterface";
import emptysite from "../../../dummy_db/emptysite.json"
import wordpresssite from "../../../dummy_db/wordpresssite.json"
import { logger } from "../../utils/logger";

const user = [
    {
        id : 1,
        name: "Dummy",
        password: "dummy"
    }
  ];
  
  export async function seed(knex: Knex): Promise<void> {
    logger.info("Seeding")
    //await knex("template").truncate();
    await knex("user").insert(user).then(()=>{
      logger.info("Inserting seed")
    });
  }