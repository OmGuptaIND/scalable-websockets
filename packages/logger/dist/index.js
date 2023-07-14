"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var loglevel_1 = __importDefault(require("loglevel"));
var Logger = /** @class */ (function () {
    function Logger(fileName) {
        // Set the log level
        loglevel_1.default.setLevel("info");
        // Set up a prefix for log messages
        this.prefix = "[".concat(fileName, "] ");
        // Create a logger instance with a name
        // this.logger = log.getLogger(fileName);
    }
    // rome-ignore lint/suspicious/noExplicitAny: lib code
    Logger.prototype.logWithPrefix = function (method, data) {
        var logMessage = typeof data === "object" ? JSON.stringify(data, null, 2) : String(data);
        var prefixedMessage = this.prefix + logMessage;
        if (method === "error" && data instanceof Error) {
            console.error(data.stack);
        }
        if (method === "info") {
            console.log(prefixedMessage);
        }
        if (method === "debug") {
            console.debug(prefixedMessage);
        }
        if (method === "warn") {
            console.warn(prefixedMessage);
        }
    };
    // rome-ignore lint/suspicious/noExplicitAny: lib code
    Logger.prototype.debug = function (data) {
        this.logWithPrefix("debug", data);
    };
    // rome-ignore lint/suspicious/noExplicitAny: lib code
    Logger.prototype.info = function (data) {
        this.logWithPrefix("info", data);
    };
    // rome-ignore lint/suspicious/noExplicitAny: lib code
    Logger.prototype.warn = function (data) {
        this.logWithPrefix("warn", data);
    };
    // rome-ignore lint/suspicious/noExplicitAny: lib code
    Logger.prototype.error = function (data) {
        this.logWithPrefix("error", data);
    };
    return Logger;
}());
exports.default = Logger;
