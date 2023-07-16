import { EnhancedEventEmitter } from 'common-js';

export type SelfPeerEvents = {};

class SelfPeer extends EnhancedEventEmitter {
  private __peerId: string | null = null;
  private __socket: WebSocket | null = null;

  get peerId(): string | null {
    return this.__peerId;
  }

  set peerId(id: string) {
    this.__peerId = id;
  }

  set socket(ws: WebSocket) {
    this.__socket = ws;
  }

  get socket(): WebSocket | null {
    return this.__socket;
  }
}

export default SelfPeer;
