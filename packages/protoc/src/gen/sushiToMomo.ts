import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { SushiToMomoServiceClient as _SushiToMomoPackage_SushiToMomoServiceClient, SushiToMomoServiceDefinition as _SushiToMomoPackage_SushiToMomoServiceDefinition } from './SushiToMomoPackage/SushiToMomoService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  RtpCapabilities: MessageTypeDefinition
  RtpCodecCapability: MessageTypeDefinition
  RtpHeaderExtension: MessageTypeDefinition
  SushiToMomoPackage: {
    JoinRoomRequest: MessageTypeDefinition
    JoinRoomResponse: MessageTypeDefinition
    SushiToMomoService: SubtypeConstructor<typeof grpc.Client, _SushiToMomoPackage_SushiToMomoServiceClient> & { service: _SushiToMomoPackage_SushiToMomoServiceDefinition }
  }
}

