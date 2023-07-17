import uWs from 'uWebSockets.js';
import { nanoid } from 'nanoid';

import { EnhancedEventEmitter } from 'common-js';
import { mainLogger } from './logger';

const logger = mainLogger.createSubLogger('SocketServer.ts');

export type UserData = {
  socketId: string;
  token: string;
  timeStamp: string;
};

export type uWebSocket<T = UserData> = uWs.WebSocket<T>;

export type SocketServerEvents = {
  open: [data: { ws: uWebSocket }];
  close: [data: { ws: uWebSocket; code: number; message: ArrayBuffer }];
};

class SocketServer {
  public observer: EnhancedEventEmitter<SocketServerEvents> = new EnhancedEventEmitter<SocketServerEvents>();
  #uws: uWs.TemplatedApp;
  #sockets: Map<string, uWs.WebSocket<UserData>> = new Map();

  public getSocket(id: string) {
    const socket = this.#sockets.get(id);

    if (!socket) throw new Error(`Socket ${id} not found`);

    return socket;
  }

  constructor() {
    this.#uws = uWs.App().ws<UserData>('/ws', {
      compression: uWs.SHARED_COMPRESSOR,
      maxPayloadLength: 16 * 1024 * 1024,
      idleTimeout: 60,

      upgrade: async (res: uWs.HttpResponse, req: uWs.HttpRequest, context: uWs.us_socket_context_t) => {
        try {
          logger.info('Upgrading Socket');

          const query = req.getQuery();

          logger.info({ query });

          const upgradeAborted = { aborted: false };

          const payload = {
            ur: req.getUrl(),
            uh: req.getHeader('host'),
            uo: req.getHeader('origin'),
            ue: req.getHeader('sec-websocket-extensions'),
            us: req.getHeader('sec-websocket-protocol'),
            uv: req.getHeader('sec-websocket-version'),
            socketId: nanoid(),
            timeStamp: new Date().getTime(),
            token: new Date().getTime().toString(),
          };

          const secWebSocketKey = req.getHeader('sec-websocket-key');
          const secWebSocketProtocol = req.getHeader('sec-websocket-protocol');
          const secWebSocketExtensions = req.getHeader('sec-websocket-extensions');

          res.onAborted(() => {
            logger.info('Upgrade Aborted');
            upgradeAborted.aborted = true;
          });

          res.cork(() => {
            if (!upgradeAborted.aborted) {
              logger.info('Upgrade Aborted, OK');
              res.writeStatus('101 Switching Protocols').writeHeader('test-header', 'header-value');
              res.upgrade(payload, secWebSocketKey, secWebSocketProtocol, secWebSocketExtensions, context);
            }

            if (upgradeAborted.aborted) {
              logger.info('Upgrade Aborted, Not OK');
              res.writeStatus('400 Bad Request').end('Bad Request', true);
            }
          });
        } catch (error) {
          logger.error('Error Upgrading Socket: ', { req: req, res: res, context: context });
          logger.error(error);
        }
      },

      open: async (ws: uWebSocket) => {
        try {
          const userData: UserData = ws.getUserData();

          logger.info({ userData }, 'New socket connection');

          const socketId = userData.socketId;

          this.#sockets.set(socketId, ws);

          this.observer.emit('open', { ws: ws });
        } catch (error) {
          logger.error('Error Opening Socket');
          logger.error(error);
        }
      },
      close: async (ws: uWebSocket, code: number, message: ArrayBuffer) => {
        try {
          const userData = ws.getUserData();
          const socket = this.getSocket(userData.socketId);

          logger.info(`Close from ${userData.socketId}`);
          logger.info({ sc: socket });

          this.#sockets.delete(userData.socketId);

          this.observer.emit('close', { ws, code, message });
        } catch (error) {
          logger.error('Error Closing Socket');
          logger.error(error);
        }
      },

      ping: async (ws: uWebSocket) => {
        try {
          const userData = ws.getUserData();
          logger.info(`Ping from ${userData.socketId}`);
        } catch (error) {
          logger.error('Error Ping Socket');
          logger.error(error);
        }
      },

      pong: async (ws: uWebSocket) => {
        try {
          logger.info({ ws }, 'Pong Socket');
        } catch (error) {
          logger.error('Error Pong Socket');
          logger.error(error);
        }
      },

      drain: async (ws: uWebSocket) => {
        try {
          const userData = ws.getUserData();
          logger.info(`Drain from ${userData.socketId}`);
        } catch (error) {
          logger.error('Error Drain Socket');
          logger.error(error);
        }
      },

      message: async (ws: uWebSocket, message: ArrayBuffer, isBinary: boolean) => {
        try {
          const userData = ws.getUserData();

          logger.info(`Message from ${userData.socketId}`);
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
