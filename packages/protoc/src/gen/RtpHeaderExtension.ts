// Original file: src/proto/common/rtp_capabilities.proto


// Original file: src/proto/common/rtp_capabilities.proto

export const _RtpHeaderExtension_MediaKind = {
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO',
} as const;

export type _RtpHeaderExtension_MediaKind =
  | 'AUDIO'
  | 0
  | 'VIDEO'
  | 1

export type _RtpHeaderExtension_MediaKind__Output = typeof _RtpHeaderExtension_MediaKind[keyof typeof _RtpHeaderExtension_MediaKind]

// Original file: src/proto/common/rtp_capabilities.proto

export const _RtpHeaderExtension_RtpHeaderExtensionDirection = {
  SENDRECV: 'SENDRECV',
  SENDONLY: 'SENDONLY',
  RECVONLY: 'RECVONLY',
  INACTIVE: 'INACTIVE',
} as const;

export type _RtpHeaderExtension_RtpHeaderExtensionDirection =
  | 'SENDRECV'
  | 0
  | 'SENDONLY'
  | 1
  | 'RECVONLY'
  | 2
  | 'INACTIVE'
  | 3

export type _RtpHeaderExtension_RtpHeaderExtensionDirection__Output = typeof _RtpHeaderExtension_RtpHeaderExtensionDirection[keyof typeof _RtpHeaderExtension_RtpHeaderExtensionDirection]

export interface RtpHeaderExtension {
  'kind'?: (_RtpHeaderExtension_MediaKind);
  'uri'?: (string);
  'preferredId'?: (number);
  'preferredEncrypt'?: (boolean);
  'direction'?: (_RtpHeaderExtension_RtpHeaderExtensionDirection);
}

export interface RtpHeaderExtension__Output {
  'kind': (_RtpHeaderExtension_MediaKind__Output);
  'uri': (string);
  'preferredId': (number);
  'preferredEncrypt': (boolean);
  'direction': (_RtpHeaderExtension_RtpHeaderExtensionDirection__Output);
}
