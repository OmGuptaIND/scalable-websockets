// Original file: src/proto/example.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ClientMessage as _ExamplePackage_ClientMessage, ClientMessage__Output as _ExamplePackage_ClientMessage__Output } from '../ExamplePackage/ClientMessage';
import type { ServerMessage as _ExamplePackage_ServerMessage, ServerMessage__Output as _ExamplePackage_ServerMessage__Output } from '../ExamplePackage/ServerMessage';

export interface ExampleClient extends grpc.Client {
  sayHello(argument: _ExamplePackage_ClientMessage, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ExamplePackage_ServerMessage__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _ExamplePackage_ClientMessage, metadata: grpc.Metadata, callback: grpc.requestCallback<_ExamplePackage_ServerMessage__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _ExamplePackage_ClientMessage, options: grpc.CallOptions, callback: grpc.requestCallback<_ExamplePackage_ServerMessage__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _ExamplePackage_ClientMessage, callback: grpc.requestCallback<_ExamplePackage_ServerMessage__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _ExamplePackage_ClientMessage, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ExamplePackage_ServerMessage__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _ExamplePackage_ClientMessage, metadata: grpc.Metadata, callback: grpc.requestCallback<_ExamplePackage_ServerMessage__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _ExamplePackage_ClientMessage, options: grpc.CallOptions, callback: grpc.requestCallback<_ExamplePackage_ServerMessage__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _ExamplePackage_ClientMessage, callback: grpc.requestCallback<_ExamplePackage_ServerMessage__Output>): grpc.ClientUnaryCall;
  
}

export interface ExampleHandlers extends grpc.UntypedServiceImplementation {
  sayHello: grpc.handleUnaryCall<_ExamplePackage_ClientMessage__Output, _ExamplePackage_ServerMessage>;
  
}

export interface ExampleDefinition extends grpc.ServiceDefinition {
  sayHello: MethodDefinition<_ExamplePackage_ClientMessage, _ExamplePackage_ServerMessage, _ExamplePackage_ClientMessage__Output, _ExamplePackage_ServerMessage__Output>
}
