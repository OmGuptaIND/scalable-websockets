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
        try {
          const socketId = uuid();
          const socket: SocketType = {
            ...ws,
            id: socketId,
          };

          const userData: UserData = ws.getUserData();

          logger.info({ userData }, 'New socket connection');

          this.#sockets.set(socketId, socket);

          this.observer.emit('open', { ws: socket });
        } catch (error) {
          logger.error('Error Opening Socket');
          logger.error(error);
        }
      },
      upgrade: async (res: uWs.HttpResponse, req: uWs.HttpRequest, context: uWs.us_socket_context_t) => {
        try {
          logger.info('Upgrading Socket');

          logger.info({ req, res, context });

          res.onAborted(() => {
            res.aborted = true;
          });

          res.writeStatus('101 Switching Protocols').writeHeader('test-header', 'header-value');

          res.upgrade(
            {
              url: req.getUrl(),
            },
            req.getHeader('sec-websocket-key'),
            req.getHeader('sec-websocket-protocol'),
            req.getHeader('sec-websocket-extensions'),
            context
          );

          if (!res.aborted) {
            logger.info('Connection Upgraded');
            res.cork(() => {
              res.end('Connection Upgraded', false);
            });
          }
        } catch (error) {
          logger.error('Error Upgrading Socket: ', { req: req, res: res, context: context });
          logger.error(error);
        }
      },

      close: async (ws: uWebSocket, code: number, message: ArrayBuffer) => {
        try {
          const userData = ws.getUserData();
          const socket = this.getSocket(userData.id);

          this.#sockets.delete(socket.id);

          this.observer.emit('close', { ws, code, message });
        } catch (error) {
          logger.error('Error Closing Socket');
          logger.error(error);
        }
      },

      ping: async (ws: uWebSocket) => {
        try {
          const userData = ws.getUserData();
          logger.info(`Ping from ${userData.id}`);
        } catch (error) {
          logger.error('Error Ping Socket');
          logger.error(error);
        }
      },

      pong: async (ws: uWebSocket) => {
        try {
          const userData = ws.getUserData();

          logger.info(`Pong from ${userData.id}`);
        } catch (error) {
          logger.error('Error Pong Socket');
          logger.error(error);
        }
      },

      drain: async (ws: uWebSocket) => {
        try {
          const userData = ws.getUserData();
          logger.info(`Drain from ${userData.id}`);
        } catch (error) {
          logger.error('Error Drain Socket');
          logger.error(error);
        }
      },

      message: async (ws: uWebSocket, message: ArrayBuffer, isBinary: boolean) => {
        try {
          const userData = ws.getUserData();

          logger.info(`Message from ${userData.id}`);
          logger.info(message);
          logger.info(isBinary);
        } catch (error) {
          logger.error('Error Message Socket: ', { msg: message });
          logger.error(error);
        }
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
