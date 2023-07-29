// Original file: src/proto/greeter.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ClientMessage as _GreeterPackage_ClientMessage, ClientMessage__Output as _GreeterPackage_ClientMessage__Output } from '../GreeterPackage/ClientMessage';
import type { ServerMessage as _GreeterPackage_ServerMessage, ServerMessage__Output as _GreeterPackage_ServerMessage__Output } from '../GreeterPackage/ServerMessage';

export interface GreeterClient extends grpc.Client {
  sayGreet(argument: _GreeterPackage_ClientMessage, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GreeterPackage_ServerMessage__Output>): grpc.ClientUnaryCall;
  sayGreet(argument: _GreeterPackage_ClientMessage, metadata: grpc.Metadata, callback: grpc.requestCallback<_GreeterPackage_ServerMessage__Output>): grpc.ClientUnaryCall;
  sayGreet(argument: _GreeterPackage_ClientMessage, options: grpc.CallOptions, callback: grpc.requestCallback<_GreeterPackage_ServerMessage__Output>): grpc.ClientUnaryCall;
  sayGreet(argument: _GreeterPackage_ClientMessage, callback: grpc.requestCallback<_GreeterPackage_ServerMessage__Output>): grpc.ClientUnaryCall;
  sayGreet(argument: _GreeterPackage_ClientMessage, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GreeterPackage_ServerMessage__Output>): grpc.ClientUnaryCall;
  sayGreet(argument: _GreeterPackage_ClientMessage, metadata: grpc.Metadata, callback: grpc.requestCallback<_GreeterPackage_ServerMessage__Output>): grpc.ClientUnaryCall;
  sayGreet(argument: _GreeterPackage_ClientMessage, options: grpc.CallOptions, callback: grpc.requestCallback<_GreeterPackage_ServerMessage__Output>): grpc.ClientUnaryCall;
  sayGreet(argument: _GreeterPackage_ClientMessage, callback: grpc.requestCallback<_GreeterPackage_ServerMessage__Output>): grpc.ClientUnaryCall;
  
}

export interface GreeterHandlers extends grpc.UntypedServiceImplementation {
  sayGreet: grpc.handleUnaryCall<_GreeterPackage_ClientMessage__Output, _GreeterPackage_ServerMessage>;
  
}

export interface GreeterDefinition extends grpc.ServiceDefinition {
  sayGreet: MethodDefinition<_GreeterPackage_ClientMessage, _GreeterPackage_ServerMessage, _GreeterPackage_ClientMessage__Output, _GreeterPackage_ServerMessage__Output>
}
