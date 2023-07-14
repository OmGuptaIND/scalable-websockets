import * as tslog from "tslog";
class Logger {
    logger;
    meta = {};
    constructor(settings, meta) {
        this.logger = new tslog.Logger({
            type: process.env.NODE_ENV === "production" ? "json" : "pretty",
            minLevel: 3,
            ...settings,
        });
        if (meta) {
            this.meta = meta;
        }
        // const axiomToken = process.env.AXIOM_TOKEN;
        // const axiomOrgId = process.env.AXIOM_ORG_ID;
        // if (axiomToken && axiomOrgId) {
        //   const axiom = new Axiom({
        //     token: axiomToken,
        //     orgId: axiomOrgId,
        //   });
        //   this.logger.attachTransport((logObj) => {
        //     axiom.ingestEvents("api", [logObj]).catch((err) => {
        //       console.error(`Failed to send log to axiom: ${err.message}`);
        //     });
        //   });
        // }
    }
    createSubLogger(name) {
        return this.logger.getSubLogger({ name });
    }
    debug(message, fields) {
        this.logger.debug({ message, ...fields, ...this.meta });
    }
    info(message, fields) {
        this.logger.info({ message, ...fields, ...this.meta });
    }
    warn(message, fields) {
        this.logger.warn({ message, ...fields, ...this.meta });
    }
    error(message, fields) {
        this.logger.error({ message, ...fields, ...this.meta });
    }
}
export default Logger;
