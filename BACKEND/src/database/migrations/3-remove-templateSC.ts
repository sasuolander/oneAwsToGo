import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    console.log("Migrating schema")
    await knex.schema.alterTable("template",(table)=>{
        table.dropColumn("templateSourceCode");
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("template");
    await knex.schema.dropTable("deployed");
    await knex.schema.dropTable("user");
}
