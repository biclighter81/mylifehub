import { DataSource } from 'typeorm';

// eslint-disable-next-line
const dotenv = require('dotenv');
dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [],
  schema: process.env.DB_SCHEMA,
  synchronize: true,
  useUTC: true,
  logging: process.env.LOG_LEVELS
    ? (process.env.LOG_LEVELS.split(',') as any)
    : ['warn', 'error'],
});
