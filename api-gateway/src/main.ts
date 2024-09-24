import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { RcpCustomExceptionFilter } from './common/rpc-custom-exception.filter';

async function bootstrap() {
  const logger = new Logger('Api Gateway');
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  );
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true
    },
  ));

  await app.listen(envs.port);
  app.useGlobalFilters(new RcpCustomExceptionFilter());
  logger.log(`Server is running on port ${envs.port} 🛡️`);

}
bootstrap();
