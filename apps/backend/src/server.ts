import * as grpc from 'grpc';
import mainLogger from './utils/logger';

const logger = mainLogger.createSubLogger('Server.ts');

import greeterHandler from './handlers/greeter';

const main = async () => {
  logger.info('Starting Server');

  const server: grpc.Server = new grpc.Server();

  server.addService(greeterHandler.service, greeterHandler.handler);

  server.bindAsync('0.0.0.0:40001', grpc.ServerCredentials.createInsecure(), (err: Error | null, port: number) => {
    if (err !== null) {
      return console.error(err);
    }

    logger.info(`Listening on ${port}`);
  });

  server.start();
};

main().catch(console.error);
