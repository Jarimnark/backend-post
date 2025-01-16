import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';

let cachedServer: Server;

async function bootstrap(): Promise<Server> {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: 'frontend-post-one.vercel.app' }); // Optional, based on your requirements
    await app.init();

    const server = createServer((req: IncomingMessage, res: ServerResponse) => {
      app.getHttpAdapter().getInstance()(req, res);
    });

    cachedServer = server;
  }

  return cachedServer;
}
export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const server = await bootstrap();
  server.emit('request', req, res);
}
