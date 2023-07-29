import * as grpc from '@grpc/grpc-js';

import mainLogger from './utils/logger';
import greeterHandler from './handlers/Greeter.handler';

const logger = mainLogger.createSubLogger('App.ts');

const main = async () => {
  logger.info('Server Starting');

  const server: grpc.Server = new grpc.Server();

  server.addService(greeterHandler.service, greeterHandler.handler);

  server.bindAsync('0.0.0.0:5001', grpc.ServerCredentials.createInsecure(), (err: Error | null, port: number) => {
    if (err !== null) {
      throw new Error('Error Starting gRPC Server');
    }

    server.start();

    logger.info(`🚀 Listening on ${port}`);
  });
};

main().catch(console.error);
