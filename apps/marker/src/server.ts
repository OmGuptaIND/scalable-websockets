import exampleHandler from './handlers/exampleH';
import mainLogger from './utils/logger';

import * as grpc from '@grpc/grpc-js';

const logger = mainLogger.createSubLogger('server.ts');

const PORT = '0.0.0.0:50051';

const main = async () => {
  logger.info('Server Starting');

  const server: grpc.Server = new grpc.Server();

  server.addService(exampleHandler.portoType.ExamplePackage.Example.service, {
    sayHello: exampleHandler.handler.sayHello,
  });

  server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err: Error | null, port: number) => {
    if (err !== null) {
      return console.error(err);
    }

    server.start();

    logger.info(`Listening on ${port}`);
  });
};

main().catch(console.error);
