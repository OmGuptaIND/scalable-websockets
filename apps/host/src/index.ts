import { mainLogger } from "./logger";

const logger = mainLogger.createSubLogger("index.ts");

logger.info("Hello, world!");
