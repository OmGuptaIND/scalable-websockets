import { EnhancedEventEmitter } from 'common-js';
import mainLogger from './logger';
import SocketConnection, { SocketConnectionState } from './SocketConnection';
import SelfPeer from './SelfPeer';

const logger = mainLogger.createSubLogger('NezukoClient.ts');

export type NezukoClientEvents = {
  connectionStateChange: [data: { ws: WebSocket; state: SocketConnection['connectionState'] }];
  connected: [data: { ws: WebSocket }];
  disconnected: [data: { ws: WebSocket }];
};

class NezukoClient extends EnhancedEventEmitter<NezukoClientEvents> {
  public socket: SocketConnection | null = null;

  public selfPeer: SelfPeer;

  constructor() {
    super();
    logger.info('NezukoClient created');

    this.selfPeer = new SelfPeer();
  }

  get connected() {
    return this.socket !== null;
  }

  get connectionState(): SocketConnectionState | 'UNINITIALIZED' {
    const socket = this.socket;

    if (!socket) return 'UNINITIALIZED';

    return socket.connectionState;
  }

  public connect = async () => {
    const socket = new SocketConnection();

    this.socket = socket;

    socket.on('open', ({ ws }) => {
      this.emit('connected', {
        ws,
      });
    });

    socket.on('clientDisconnected', ({ ws }) => {
      this.emit('disconnected', {
        ws,
      });
    });

    this.registerConnectionStateEvents({ socket });
  };

  public registerConnectionStateEvents = (data: { socket: SocketConnection }) => {
    data.socket.on('connectionStateChange', ({ ws, state }) => {
      this.emit('connectionStateChange', {
        ws,
        state,
      });
    });
  };
}

export default NezukoClient;
