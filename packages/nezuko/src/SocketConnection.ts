import { EnhancedEventEmitter } from 'common-js';
import mainLogger from './logger';

const ENDPOINT = 'ws://localhost:5555/ws';

const MESSAGE_ENUM = Object.freeze({
  SELF_CONNECTED: 'SELF_CONNECTED',
  CLIENT_CONNECTED: 'CLIENT_CONNECTED',
  CLIENT_DISCONNECTED: 'CLIENT_DISCONNECTED',
  CLIENT_MESSAGE: 'CLIENT_MESSAGE',
});

export type SocketConnectionEvents = {
  connectionStateChange: [data: { ws: WebSocket; state: SocketConnectionState }];
  open: [data: { ws: WebSocket }];
  'connect-error': [data: { ws: WebSocket }];
  clientConnected: [data: { ws: WebSocket; payload: { id: string } }];
  clientDisconnected: [data: { ws: WebSocket; payload: { id: string } }];
  clientMessage: [data: { ws: WebSocket; payload: { id: string; message: string } }];
  error: [
    data: {
      error: {
        message: string;
      };
    }
  ];
};

export type SocketConnectionState = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED';

export const socketConnectionReadyState = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'] as const;

const logger = mainLogger.createSubLogger('SocketConnection.ts');

class SocketConnection extends EnhancedEventEmitter<SocketConnectionEvents> {
  private static __instance: SocketConnection;
  public roomId: string | null = null;

  protected _socket: WebSocket;

  private __connectionState = 'CONNECTING';

  private set connectionState(state: SocketConnectionState) {
    if (this.__connectionState !== state) {
      this.emit('connectionStateChange', { ws: this._socket, state });
    }

    this.__connectionState = state;
  }

  public get connectionState() {
    const readyState = this._socket.readyState;
    const state = socketConnectionReadyState[readyState];

    return state;
  }

  public static init = (token: string) => {
    if (SocketConnection.__instance) return SocketConnection.__instance;

    try {
      const socket = new WebSocket(`${ENDPOINT}?token=${token}`);

      SocketConnection.__instance = new SocketConnection({ socket });

      return SocketConnection.__instance;
    } catch (error) {
      logger.error(error);

      throw error;
    }
  };

  constructor(data: { socket: WebSocket }) {
    super();

    this._socket = data.socket;

    this._socket.onopen = (ev: Event) => {
      logger.info({ ev }, 'Socket connection opened');

      this.emit('open', { ws: this._socket });

      this.connectionState = 'OPEN';
    };

    this._socket.onerror = (ev: Event) => {
      logger.info({ ev }, 'Socket connection error');

      this.emit('connect-error', { ws: this._socket });

      this.connectionState = 'CLOSED';
    };

    this._socket.onmessage = (ev: MessageEvent) => {
      logger.info({ ev }, 'Socket connection message');

      const { type, payload } = JSON.parse(ev.data);

      switch (type) {
        case MESSAGE_ENUM.SELF_CONNECTED: {
          this.roomId = payload.roomId;
          break;
        }
        case MESSAGE_ENUM.CLIENT_CONNECTED: {
          this.emit('clientConnected', { ws: this._socket, payload });
          break;
        }
        case MESSAGE_ENUM.CLIENT_DISCONNECTED: {
          this.emit('clientDisconnected', { ws: this._socket, payload });
          break;
        }
        case MESSAGE_ENUM.CLIENT_MESSAGE: {
          this.emit('clientMessage', { ws: this._socket, payload });
          break;
        }
      }
    };
  }

  close = (data: { code?: number; reason?: string }) => {
    this._socket.close(data.code, data.reason);
  };
}

export default SocketConnection;
