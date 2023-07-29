// Original file: src/proto/sushiToMomo.proto

import type { RtpCapabilities as _RtpCapabilities, RtpCapabilities__Output as _RtpCapabilities__Output } from '../RtpCapabilities';

export interface JoinRoomResponse {
  'roomId'?: (string);
  'peerId'?: (string);
  'rtpCapabilities'?: (_RtpCapabilities | null);
}

export interface JoinRoomResponse__Output {
  'roomId': (string);
  'peerId': (string);
  'rtpCapabilities': (_RtpCapabilities__Output | null);
}
