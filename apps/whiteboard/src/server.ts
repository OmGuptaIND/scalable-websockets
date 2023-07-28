import env from './env';
import exampleHandler from './handlers/example.handler';
import greeterHandler from './handlers/greeter.handler';
import mainLogger from './utils/logger';

import * as grpc from '@grpc/grpc-js';

const logger = mainLogger.createSubLogger('server.ts');

const main = async () => {
  logger.info('Server Starting');

  const server: grpc.Server = new grpc.Server();

  server.addService(exampleHandler.service, exampleHandler.handler);
  server.addService(greeterHandler.service, greeterHandler.handler);

  const PORT = `0.0.0.0:${env.PORT}`;

  server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err: Error | null, port: number) => {
    if (err !== null) {
      return console.error(err);
    }

    server.start();

    logger.info(`Listening on ${port}`);
  });
};

main().catch(console.error);
