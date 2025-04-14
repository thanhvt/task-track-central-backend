import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Task } from '../tasks/entities/task.entity';
import * as fs from 'fs';

dotenv.config();

// Ensure port is properly parsed as a number
const dbPort = parseInt(process.env.DB_PORT || '1433', 10);

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: dbPort,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Task],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false, // Disable automatic schema synchronization
  options: {
    encrypt: false, // Use this if you're on Windows Azure
    trustServerCertificate: true,
  },
});
