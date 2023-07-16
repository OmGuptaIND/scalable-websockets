import uWs from 'uWebSockets.js';
import { uuid } from 'uuidv4';

import { EnhancedEventEmitter } from 'common-js';
import { mainLogger } from './logger';

const logger = mainLogger.createSubLogger('SocketServer.ts');

export type UserData = {
  id: string;
  token: string;
};

export type uWebSocket<T = UserData> = uWs.WebSocket<T>;

export type SocketServerEvents = {
  open: [data: { ws: uWebSocket }];
  close: [data: { ws: uWebSocket; code: number; message: ArrayBuffer }];
};

export type SocketType = uWebSocket & { id: string };

class SocketServer {
  public observer: EnhancedEventEmitter<SocketServerEvents> = new EnhancedEventEmitter<SocketServerEvents>();
  #uws: uWs.TemplatedApp;
  #sockets: Map<string, SocketType> = new Map();

  public getSocket(id: string) {
    const socket = this.#sockets.get(id);

    if (!socket) throw new Error(`Socket ${id} not found`);

    return socket;
  }

  constructor() {
    this.#uws = uWs.App().ws('/ws', {
      compression: uWs.SHARED_COMPRESSOR,
      maxPayloadLength: 16 * 1024 * 1024,
      idleTimeout: 60,
      open: async (ws: uWebSocket) => {
        const socketId = uuid();
        const socket: SocketType = {
          ...ws,
          id: socketId,
        };

        const userData: UserData = ws.getUserData();

        logger.info({ userData }, 'New socket connection');

        this.#sockets.set(socketId, socket);

        this.observer.emit('open', { ws: socket });
      },
      close: async (ws: uWebSocket, code: number, message: ArrayBuffer) => {
        const userData = ws.getUserData();
        const socket = this.getSocket(userData.id);

        this.#sockets.delete(socket.id);

        this.observer.emit('close', { ws, code, message });
      },

      ping: async (ws: uWebSocket) => {
        const userData = ws.getUserData();
        logger.info(`Ping from ${userData.id}`);
      },

      pong: async (ws: uWebSocket) => {
        const userData = ws.getUserData();

        logger.info(`Pong from ${userData.id}`);
      },

      drain: async (ws: uWebSocket) => {
        const userData = ws.getUserData();
        logger.info(`Drain from ${userData.id}`);
      },

      message: async (ws: uWebSocket, message: ArrayBuffer, isBinary: boolean) => {
        const userData = ws.getUserData();

        logger.info(`Message from ${userData.id}`);
        logger.info(message);
        logger.info(isBinary);
      },
    });
  }

  public listen(port: number) {
    this.#uws.listen(port, (listenSocket) => {
      if (listenSocket) {
        logger.info(`🚀 Listening on port ${port}`);
      }
    });
  }
}

export default SocketServer;
