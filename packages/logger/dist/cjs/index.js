"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tslog = __importStar(require("tslog"));
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
exports.default = Logger;
