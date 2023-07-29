// Original file: src/proto/common/rtp_capabilities.proto


// Original file: src/proto/common/rtp_capabilities.proto

export const _RtpCodecCapability_MediaKind = {
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO',
} as const;

export type _RtpCodecCapability_MediaKind =
  | 'AUDIO'
  | 0
  | 'VIDEO'
  | 1

export type _RtpCodecCapability_MediaKind__Output = typeof _RtpCodecCapability_MediaKind[keyof typeof _RtpCodecCapability_MediaKind]

export interface _RtpCodecCapability_RtcpFeedback {
  'type'?: (string);
  'parameter'?: (number);
}

export interface _RtpCodecCapability_RtcpFeedback__Output {
  'type': (string);
  'parameter': (number);
}

export interface RtpCodecCapability {
  'kind'?: (_RtpCodecCapability_MediaKind);
  'mimeType'?: (string);
  'preferredPayloadType'?: (number);
  'clockRate'?: (number);
  'channels'?: (number);
  'parameters'?: ({[key: string]: string});
  'rtcpFeedback'?: (_RtpCodecCapability_RtcpFeedback)[];
}

export interface RtpCodecCapability__Output {
  'kind': (_RtpCodecCapability_MediaKind__Output);
  'mimeType': (string);
  'preferredPayloadType': (number);
  'clockRate': (number);
  'channels': (number);
  'parameters': ({[key: string]: string});
  'rtcpFeedback': (_RtpCodecCapability_RtcpFeedback__Output)[];
}
