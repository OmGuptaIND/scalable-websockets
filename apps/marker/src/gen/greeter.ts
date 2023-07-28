import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { GreeterClient as _GreeterPackage_GreeterClient, GreeterDefinition as _GreeterPackage_GreeterDefinition } from './GreeterPackage/Greeter';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  GreeterPackage: {
    ClientMessage: MessageTypeDefinition
    Greeter: SubtypeConstructor<typeof grpc.Client, _GreeterPackage_GreeterClient> & { service: _GreeterPackage_GreeterDefinition }
    ServerMessage: MessageTypeDefinition
  }
}

