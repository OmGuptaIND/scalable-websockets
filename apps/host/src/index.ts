import SocketServer from './SocketServer';
import { mainLogger } from './logger';

const logger = mainLogger.createSubLogger('index.ts');

const main = async () => {
  const ws = new SocketServer();

  ws.listen(5555);

  ws.observer.on('open', ({ ws }) => {
    const userData = ws.getUserData();
    logger.info(`New connection: ${userData.socketId}`);
  });

  ws.observer.on('close', ({ ws, code, message }) => {
    const userData = ws.getUserData();

    logger.info(`Connection closed: ${userData.socketId} (${code})`);
    logger.info(message);
  });
};

main().catch(logger.error);
