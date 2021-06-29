import { Request, Response } from "express";
import knex from "../database/index";
import deepMailValidator from "deep-email-validator";

export default {
  async getAll(_: Request, res: Response) {
    try {
      const contact = await knex("contacts").leftOuterJoin(
        "contacts_address",
        "contacts.id",
        "contacts_address.id_contacts"
      );

      return res.status(200).json(contact);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  async create(req: Request, res: Response) {
    const { name, email, phone, type, cpf_cnpj, address } = req.body;

    if (!name) {
      return res.status(400).json({ error: "name not provided" });
    }

    if (!email) {
      return res.status(400).json({ error: "email not provided" });
    }

    if (!(type === "PF" || type === "PJ")) {
      return res.status(400).json({ error: "type must be PF or PJ" });
    }

    if (!cpf_cnpj) {
      return res.status(400).json({ error: "cpf_cnpj not provided" });
    }

    if (type === "PF") {
      const isCPFCorrect = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf_cnpj);

      if (!isCPFCorrect) {
        return res.status(400).json({
          error: "use the 000.000.000-00 format for the CPF field",
        });
      }
    }

    if (type === "PJ") {
      const isCNPJCorrect = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(
        cpf_cnpj
      );

      if (!isCNPJCorrect) {
        return res.status(400).json({
          error: "use the 00.000.000/0000-00 format for the CPF field",
        });
      }
    }

    try {
      const isValidEmail = await deepMailValidator({
        email,
        sender: email,
        validateTypo: false,
        validateDisposable: false,
        validateMx: false,
        validateSMTP: false,
        validateRegex: true,
      });

      if (!isValidEmail.valid) {
        return res.status(400).json({
          error: "invalid email address",
          reason: isValidEmail.reason,
        });
      }
    } catch (error) {
      return res.status(400).json(error);
    }

    // check if contact name already exists
    try {
      const duplicatedContactName = await knex("contacts").where("name", name);

      if (duplicatedContactName.length >= 1) {
        return res.status(400).json({
          error: "contact name already exists",
        });
      }
    } catch (error) {
      return res.status(400).json(error);
    }

    // check if contact email already exists
    try {
      const duplicatedContactEmail = await knex("contacts").where(
        "email",
        email
      );

      if (duplicatedContactEmail.length >= 1) {
        return res.status(400).json({
          error: "contact e-mail already exists",
        });
      }
    } catch (error) {
      return res.status(400).json(error);
    }

    // if the address fields were not sent, try to insert only contact data
    if (!address) {
      try {
        const contact = await knex("contacts")
          .insert({
            name,
            email,
            phone,
            type,
            cpf_cnpj,
            status: "Ativo",
          })
          .returning("*");

        return res.status(200).json(contact);
      } catch (error) {
        return res.status(400).json(error);
      }
    }

    if (!address?.zipcode) {
      return res.status(400).json({ error: "zipcode not provided" });
    }

    if (!address?.street) {
      return res.status(400).json({ error: "street not provided" });
    }

    if (!address?.number) {
      return res.status(400).json({ error: "number not provided" });
    }

    if (!address?.complement) {
      return res.status(400).json({ error: "complement not provided" });
    }

    if (!address?.district) {
      return res.status(400).json({ error: "district not provided" });
    }

    if (!address?.city) {
      return res.status(400).json({ error: "city not provided" });
    }

    if (!address?.state) {
      return res.status(400).json({ error: "state not provided" });
    }

    const alowedStates = [
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
    ];

    if (!alowedStates.some((state) => state === address?.state)) {
      return res
        .status(400)
        .json({ error: "use the AA format for the state field" });
    }

    const validZipcode = /^\d{5}\-\d{3}$/.test(address?.zipcode);

    if (!validZipcode) {
      return res
        .status(400)
        .json({ error: "use the 00000-000 format for the zipcode field" });
    }

    try {
      const createdContact = await knex("contacts")
        .insert({
          name,
          email,
          phone,
          type,
          cpf_cnpj,
          status: "Ativo",
        })
        .returning("*");

      try {
        const createdAddress = await knex("contacts_address")
          .insert({
            id_contacts: createdContact[0].id,
            zipcode: address.zipcode,
            street: address.street,
            number: address.number,
            complement: address.complement,
            district: address.district,
            city: address.city,
            state: address.state,
          })
          .returning("*");

        return res
          .status(200)
          .json({ contact: createdContact[0], address: createdAddress[0] });
      } catch (error) {
        await knex("contacts").where("id", createdContact[0].id).del();
        return res.status(400).json(error);
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
