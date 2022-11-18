import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    console.log("Migrating schema")
    await knex.schema.alterTable("deployed",(table)=>{
        table.string("name",10000);
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("template");
    await knex.schema.dropTable("deployed");
    await knex.schema.dropTable("user");
}
