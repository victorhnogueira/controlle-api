import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("contacts", function (table) {
    table.increments("id").primary();
    table.text("name").unique().notNullable();
    table.text("email").unique().notNullable();
    table.text("phone").nullable();
    table.enu('type', ["PF", "PJ"]).notNullable(); // PF ou PJ
    table.text("cpf_cnpj").notNullable();
    table.enu('status', ["Ativo", "Inativo"]).notNullable(); // Ativo/Inativo
    table.timestamp("dt_created_at").defaultTo(knex.fn.now());
    table.timestamp("dt_updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("contacts");
}
