import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ExampleClient as _ExamplePackage_ExampleClient, ExampleDefinition as _ExamplePackage_ExampleDefinition } from './ExamplePackage/Example';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  ExamplePackage: {
    ClientMessage: MessageTypeDefinition
    Example: SubtypeConstructor<typeof grpc.Client, _ExamplePackage_ExampleClient> & { service: _ExamplePackage_ExampleDefinition }
    ServerMessage: MessageTypeDefinition
  }
}

