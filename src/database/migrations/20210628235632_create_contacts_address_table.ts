import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("contacts_address", function (table) {
    table.increments("id").primary();
    table.integer("id_contacts").references("contacts.id").notNullable();
    table.text("zipcode").notNullable();
    table.text("street").notNullable();
    table.text("number").notNullable();
    table.text("complement").notNullable();
    table.text("district").notNullable();
    table.text("city").notNullable();
    table
      .enu("state", [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO",
      ])
      .notNullable();
    table.timestamp("dt_created_at").defaultTo(knex.fn.now());
    table.timestamp("dt_updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("contacts_address");
}
