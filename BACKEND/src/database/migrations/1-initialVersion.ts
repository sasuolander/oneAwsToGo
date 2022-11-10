import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("template", (table) => {
        table.integer("id").primary();
        table.string("name").notNullable();
        table.string("formConfig",10000).notNullable();
        table.integer("format").notNullable();
        table.string("url",10000).notNullable();
    });

    await knex.schema.createTable("deployed", (table) => {
        table.integer("id").primary();
        table.integer("template_id").notNullable();
        table.string("stack_id",10000).notNullable();
        table.timestamp("creation_date").defaultTo(knex.fn.now())
        table.string("status").notNullable();
        table.foreign('template_id').references('template.id').deferrable('deferred')
    });

    await knex.schema.createTable("user", (table) => {
        table.uuid("id").primary();
        table.string("name").notNullable();
        table.string("password",10000).notNullable();
    });
}



export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("template");
    await knex.schema.dropTable("deployed");
    await knex.schema.dropTable("user");
}
