import * as grpc from '@grpc/grpc-js';

import * as protoLoader from '@grpc/proto-loader';

import { ProtoGrpcType as ExampleGrcpType } from '../gen/example';

import { ClientMessage as ExampleMessage } from '../gen/ExamplePackage/ClientMessage';

import { ExampleHandlers } from '../gen/ExamplePackage/Example';

import { ServerMessage } from '../gen/ExamplePackage/ServerMessage';
import mainLogger from '../utils/logger';

const logger = mainLogger.createSubLogger('exampleH.ts');

class Handler {
  public static readonly definition = protoLoader.loadSync(`${__dirname}/../proto/example.proto`, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  public readonly package = 'ExamplePackage';

  public readonly portoType = grpc.loadPackageDefinition(Handler.definition) as unknown as ExampleGrcpType;

  handler: ExampleHandlers = {
    sayHello: (call: grpc.ServerUnaryCall<ExampleMessage, ServerMessage>, callback: grpc.sendUnaryData<ServerMessage>): void => {
      logger.info(`Received message: ${call}`);

      logger.info({ x: call.request });

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
