import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Task } from '../tasks/entities/task.entity';
import * as fs from 'fs';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Task],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  ssl: {
    ca: process.env.DB_CA_CERT
      ? fs.readFileSync(process.env.DB_CA_CERT).toString()
      : undefined,
    rejectUnauthorized: true,
  },
});
