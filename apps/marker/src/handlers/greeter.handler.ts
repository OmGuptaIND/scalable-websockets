import * as grpc from '@grpc/grpc-js';

import * as protoLoader from '@grpc/proto-loader';

import { ProtoGrpcType } from '../gen/greeter';

import { ClientMessage } from '../gen/GreeterPackage/ClientMessage';

import { GreeterHandlers } from '../gen/GreeterPackage/Greeter';

import { ServerMessage } from '../gen/GreeterPackage/ServerMessage';

import mainLogger from '../utils/logger';

const logger = mainLogger.createSubLogger('exampleH.ts');

class Handler {
  public readonly package = 'ExamplePackage';

  static readonly #protoFilePath = `${__dirname}/../proto/greeter.proto`;

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
    return this.packageDefinition.GreeterPackage.Greeter.service;
  }

  handler: GreeterHandlers = {
    sayGreet: (call: grpc.ServerUnaryCall<ClientMessage, ServerMessage>, callback: grpc.sendUnaryData<ServerMessage>): void => {
      logger.info(`Received message: ${call}`);

      logger.info({ x: call.request });

      const map = call.metadata.getMap();

      logger.info({ map });

      if (call.request) {
        const reply: ServerMessage = {
          message: `Server Send Back ${call.request.greet}`,
        };

        callback(null, reply);
      }
    },
  };
}

const greeterHandler = new Handler();

export default greeterHandler;
