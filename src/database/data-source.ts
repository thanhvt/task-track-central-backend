import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Task } from '../tasks/entities/task.entity';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1433'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Task],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
});
