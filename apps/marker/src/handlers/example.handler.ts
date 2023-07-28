import * as grpc from '@grpc/grpc-js';

import * as protoLoader from '@grpc/proto-loader';

import { ProtoGrpcType } from '../gen/example';

import { ClientMessage as ExampleMessage } from '../gen/ExamplePackage/ClientMessage';

import { ExampleHandlers } from '../gen/ExamplePackage/Example';

import { ServerMessage } from '../gen/ExamplePackage/ServerMessage';

import mainLogger from '../utils/logger';

const logger = mainLogger.createSubLogger('exampleH.ts');

class Handler {
  public readonly package = 'ExamplePackage';

  static readonly #protoFilePath = `${__dirname}/../proto/example.proto`;

  public static readonly definition = protoLoader.loadSync(Handler.#protoFilePath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  get packageDefinition() {
    const definition = grpc.loadPackageDefinition(Handler.definition) as unknown as ProtoGrpcType;

    return definition;
  }

  get service() {
    return this.packageDefinition.ExamplePackage.Example.service;
  }

  handler: ExampleHandlers = {
    sayHello: (call: grpc.ServerUnaryCall<ExampleMessage, ServerMessage>, callback: grpc.sendUnaryData<ServerMessage>): void => {
      logger.info(`Received message: ${call}`);

      const map = call.metadata.getMap();

      logger.info({ map });

      if (call.request) {
        const reply: ServerMessage = {
          name: `Hello ${call.request.message}`,
        };

        callback(null, reply);
      }
    },
  };
}

const exampleHandler = new Handler();

export default exampleHandler;
