// Original file: src/proto/common/rtp_capabilities.proto

import type { RtpCodecCapability as _RtpCodecCapability, RtpCodecCapability__Output as _RtpCodecCapability__Output } from './RtpCodecCapability';
import type { RtpHeaderExtension as _RtpHeaderExtension, RtpHeaderExtension__Output as _RtpHeaderExtension__Output } from './RtpHeaderExtension';

export interface RtpCapabilities {
  'codecs'?: (_RtpCodecCapability)[];
  'headerExtensions'?: (_RtpHeaderExtension)[];
}

export interface RtpCapabilities__Output {
  'codecs': (_RtpCodecCapability__Output)[];
  'headerExtensions': (_RtpHeaderExtension__Output)[];
}
