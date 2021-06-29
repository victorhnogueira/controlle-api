import { Request, Response } from 'express'
import knex from '../database/index'

export default {
  getAll: async (_: Request, res:Response) => {
    const contacts = await knex('contacts')

    return res.status(200).json(contacts)
  },
  create: (req: Request, res:Response) => {
    return res.status(200).json({ msg: 'Hello World' })
  },
}