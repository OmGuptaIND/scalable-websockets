import SocketServer from "./SocketServer";
import { mainLogger } from "./logger";

const logger = mainLogger.createSubLogger("index.ts");

const main = async () => {
  const ws = new SocketServer();

  ws.listen(3000);

  ws.observer.on("open", ({ ws }) => {
    logger.info(`New connection: ${ws.id}`);
  });

  ws.observer.on("close", ({ ws, code, message }) => {
    logger.info(`Connection closed: ${ws.id} (${code})`);
    logger.info(message);
  });
};

main().catch(logger.error);
