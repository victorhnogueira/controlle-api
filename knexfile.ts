import dotenv from 'dotenv'
dotenv.config()

export default {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    },
    migrations: {
      tableName: 'migrations',
      directory: `${__dirname}/src/database/migrations`,
      extension: 'ts'
    }
  },
};
