/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import * as fs from 'fs';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
      expandVariables: true,
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {

        // Ensure port is properly parsed as a number
        const dbPort = parseInt(configService.get('DB_PORT', '1433'), 10);

        return {
          type: 'mssql',
          host: configService.get('DB_HOST', '10.1.139.55'),
          port: dbPort,
          username: configService.get('DB_USERNAME', 'QLPhongGym'),
          password: configService.get('DB_PASSWORD', 'QLPhongGym'),
          database: configService.get('DB_DATABASE', 'QLPhongGym'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false, // Disable automatic schema synchronization
          options: {
            encrypt: false,
            trustServerCertificate: true,
          },
        };
      },
      inject: [ConfigService],
    }),
    TasksModule,
  ],
})
export class AppModule {}
