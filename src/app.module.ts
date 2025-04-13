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
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const ssl = configService.get('DB_SSL') === 'true';
        const caCertPath = configService.get('DB_CA_CERT');

        if (ssl && !caCertPath) {
          throw new Error('DB_CA_CERT is required when DB_SSL is true');
        }

        const sslConfig = ssl
          ? {
              rejectUnauthorized: true,
              ca: fs
                .readFileSync(path.join(process.cwd(), caCertPath as string))
                .toString(),
            }
          : undefined;

        return {
          type: 'postgres',
          host: configService.get('DB_HOST', 'localhost'),
          port: configService.get('DB_PORT', 5432),
          username: configService.get('DB_USERNAME', 'postgres'),
          password: configService.get('DB_PASSWORD', 'postgres'),
          database: configService.get('DB_DATABASE', 'task_track_central'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: configService.get('NODE_ENV') !== 'production',
          ssl: sslConfig,
        };
      },
      inject: [ConfigService],
    }),
    TasksModule,
  ],
})
export class AppModule {}
