// Original file: src/proto/sushiToMomo.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { JoinRoomRequest as _SushiToMomoPackage_JoinRoomRequest, JoinRoomRequest__Output as _SushiToMomoPackage_JoinRoomRequest__Output } from '../SushiToMomoPackage/JoinRoomRequest';
import type { JoinRoomResponse as _SushiToMomoPackage_JoinRoomResponse, JoinRoomResponse__Output as _SushiToMomoPackage_JoinRoomResponse__Output } from '../SushiToMomoPackage/JoinRoomResponse';

export interface SushiToMomoServiceClient extends grpc.Client {
  requestJoinRoom(argument: _SushiToMomoPackage_JoinRoomRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_SushiToMomoPackage_JoinRoomResponse__Output>): grpc.ClientUnaryCall;
  requestJoinRoom(argument: _SushiToMomoPackage_JoinRoomRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_SushiToMomoPackage_JoinRoomResponse__Output>): grpc.ClientUnaryCall;
  requestJoinRoom(argument: _SushiToMomoPackage_JoinRoomRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_SushiToMomoPackage_JoinRoomResponse__Output>): grpc.ClientUnaryCall;
  requestJoinRoom(argument: _SushiToMomoPackage_JoinRoomRequest, callback: grpc.requestCallback<_SushiToMomoPackage_JoinRoomResponse__Output>): grpc.ClientUnaryCall;
  requestJoinRoom(argument: _SushiToMomoPackage_JoinRoomRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_SushiToMomoPackage_JoinRoomResponse__Output>): grpc.ClientUnaryCall;
  requestJoinRoom(argument: _SushiToMomoPackage_JoinRoomRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_SushiToMomoPackage_JoinRoomResponse__Output>): grpc.ClientUnaryCall;
  requestJoinRoom(argument: _SushiToMomoPackage_JoinRoomRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_SushiToMomoPackage_JoinRoomResponse__Output>): grpc.ClientUnaryCall;
  requestJoinRoom(argument: _SushiToMomoPackage_JoinRoomRequest, callback: grpc.requestCallback<_SushiToMomoPackage_JoinRoomResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface SushiToMomoServiceHandlers extends grpc.UntypedServiceImplementation {
  requestJoinRoom: grpc.handleUnaryCall<_SushiToMomoPackage_JoinRoomRequest__Output, _SushiToMomoPackage_JoinRoomResponse>;
  
}

export interface SushiToMomoServiceDefinition extends grpc.ServiceDefinition {
  requestJoinRoom: MethodDefinition<_SushiToMomoPackage_JoinRoomRequest, _SushiToMomoPackage_JoinRoomResponse, _SushiToMomoPackage_JoinRoomRequest__Output, _SushiToMomoPackage_JoinRoomResponse__Output>
}
