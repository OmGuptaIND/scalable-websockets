import { EnhancedEventEmitter } from 'common-js';
import mainLogger from './logger';
import SocketConnection from './SocketConnection';
import SelfPeer from './SelfPeer';

const logger = mainLogger.createSubLogger('NezukoClient.ts');

export type NezukoClientEvents = {
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
  };
}

export default NezukoClient;
