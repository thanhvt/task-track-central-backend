import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const caCertPath = process.env.DB_CA_CERT;
if (!caCertPath) {
  throw new Error('DB_CA_CERT environment variable is not set');
}

export default new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1433'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
});
