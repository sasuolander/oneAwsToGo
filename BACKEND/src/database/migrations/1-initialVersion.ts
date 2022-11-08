import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("template", (table) => {
        table.integer("id").primary();
        table.string("name").notNullable();
        table.string("formConfig").notNullable();
        table.integer("format").notNullable();
        table.string("url").notNullable();
    });

    await knex.schema.createTable("deployed", (table) => {
        table.integer("id").primary();
        table.string("template_id").notNullable();
        table.string("stack_id").notNullable();
        table.timestamp("creation_date").defaultTo("CURRENT_TIMESTAMP");
        table.string("status").notNullable();
        table.foreign('template_id').references('template.id').deferrable('deferred')
    });

    await knex.schema.createTable("user", (table) => {
        table.uuid("id").primary();
        table.string("name").notNullable();
        table.string("password").notNullable();
    });
}



export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("template");
    await knex.schema.dropTable("deployed");
    await knex.schema.dropTable("User");
}
