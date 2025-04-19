import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: false,
  });

  // Set global prefix for all routes when running under IIS sub-application
  const globalPrefix = 'task-track'; // process.env.NODE_ENV === 'production' ? 'task-track' : '';
  if (globalPrefix) {
    app.setGlobalPrefix(globalPrefix);
  }

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('Task Track Central API')
    .setDescription('API documentation for Task Track Central application')
    .setVersion('1.0')
    .addTag('tasks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // Setup Swagger with the correct path
  const swaggerPath = globalPrefix ? `${globalPrefix}/api` : 'api';
  SwaggerModule.setup(swaggerPath, app, document);

  const port = process.env.PORT || 80;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/${swaggerPath}`);
  console.log('Environment variables:', {
    DB_HOST: process.env.DB_HOST,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
  });
}
bootstrap();
