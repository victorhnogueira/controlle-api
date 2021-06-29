import knex from 'knex'
import knexfile from '../../knexfile';

const knexSetup = knex(knexfile.development)

export default knexSetup