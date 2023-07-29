import * as grpc from '@grpc/grpc-js';

import * as protoLoader from '@grpc/proto-loader';

import { ProtoGrpcType } from 'protoc/dist/greeter';

import { GreeterHandlers } from 'protoc/dist/GreeterPackage/Greeter';

import { ClientMessage } from 'protoc/dist/GreeterPackage/ClientMessage';

import { ServerMessage } from 'protoc/dist/GreeterPackage/ServerMessage';
import mainLogger from '../utils/logger';

const logger = mainLogger.createSubLogger('GreeterHandler');

class GreeterHandler {
  public readonly package = 'GreeterPackage';

  static readonly #protoFilePath = `${__dirname}/../../node_modules/protoc/dist/proto/greeter.proto`;

  public static readonly definition = protoLoader.loadSync(GreeterHandler.#protoFilePath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  get packageDefinition() {
    const definition = grpc.loadPackageDefinition(GreeterHandler.definition) as unknown as ProtoGrpcType;

    return definition;
  }

  get service() {
    return this.packageDefinition.GreeterPackage.Greeter.service;
  }

  public handler: GreeterHandlers = {
    sayGreet: (call: grpc.ServerUnaryCall<ClientMessage, ServerMessage>, callback: grpc.sendUnaryData<ServerMessage>) => {
      logger.info('Say Hello Invoked');

      const message: ServerMessage = {
        message: `Hello ${call.request.greet}`,
      };

      callback(null, message);
    },
  };
}

const greeterHandler = new GreeterHandler();

export default greeterHandler;
