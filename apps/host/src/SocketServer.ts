import uWs from 'uWebSockets.js';
import { uuid } from 'uuidv4';

import { EnhancedEventEmitter } from 'common-js';
import { mainLogger } from './logger';

const logger = mainLogger.createSubLogger('SocketServer.ts');

export type SocketServerEvents = {
  open: [data: { ws: uWs.WebSocket }];
  close: [data: { ws: uWs.WebSocket; code: number; message: ArrayBuffer }];
};

export type SocketType = uWs.WebSocket & { id: string };

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
      open: async (ws: uWs.WebSocket) => {
        const socket: SocketType = {
          ...ws,
          id: uuid(),
        };

        this.#sockets.set(ws.id, socket);

        this.observer.emit('open', { ws: socket });
      },
      close: async (ws: uWs.WebSocket, code: number, message: ArrayBuffer) => {
        const socket = this.getSocket(ws.id);

        this.#sockets.delete(socket.id);

        this.observer.emit('close', { ws, code, message });
      },

      ping: async (ws: uWs.WebSocket) => {
        logger.info(`Ping from ${ws.id}`);
      },

      pong: async (ws: uWs.WebSocket) => {
        logger.info(`Pong from ${ws.id}`);
      },

      drain: async (ws: uWs.WebSocket) => {
        logger.info(`Drain from ${ws.id}`);
      },

      message: async (ws: uWs.WebSocket, message: ArrayBuffer, isBinary: boolean) => {
        logger.info(`Message from ${ws.id}`);
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
