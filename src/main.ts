import { NestFactory, PartialGraphHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import { writeFileSync } from 'fs';
import { credentials } from '@/config/grpc';

const logger = new Logger(bootstrap.name);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    forceCloseConnections: true,
    abortOnError: false,
  });

  app.enableCors({
    origin: '*',
  });
  app.use(helmet());
  app.use(compression());

  const config_service = app.get(ConfigService);
  app.enableShutdownHooks();

  const TLS_ENABLE = credentials._isSecure();

  const PORT = config_service.get('PORT') ?? 3001;
  await app.listen(Number(PORT), () => {});

  async function gracefulShutdown(signal: NodeJS.Signals) {
    await app.close();
    process.kill(process.pid, signal);
  }

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);

  return {
    TLS_ENABLE
  }
}
bootstrap()
  .then(({ TLS_ENABLE }) => {
    logger.log(`[TLS] ${TLS_ENABLE ? 'TRUE' : 'FALSE'}`);
  })
  .catch((err) => {
    logger.error(err);
    writeFileSync('graph.json', PartialGraphHost.toString() ?? '');
    process.exit(1);
  });
