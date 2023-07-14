"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancedEventEmitter = void 0;
const events_1 = require("events");
class EnhancedEventEmitter {
    constructor() {
        this.emitter = new events_1.EventEmitter();
        this.emitter.setMaxListeners(Infinity);
    }
    on(eventName, listener) {
        this.emitter.on(eventName, listener);
        return this;
    }
    off(eventName, listener) {
        this.emitter.off(eventName, listener);
        return this;
    }
    listenerCount(eventName) {
        return this.emitter.listenerCount(eventName);
    }
    listeners(eventName) {
        return this.emitter.listeners(eventName);
    }
    emit(eventName, ...args) {
        return this.emitter.emit(eventName, ...args);
    }
    safeEmit(eventName, ...args) {
        return this.emitter.emit(eventName, ...args);
    }
    once(eventName, listener) {
        this.emitter.once(eventName, listener);
        return this;
    }
    removeAllListeners(eventName) {
        if (eventName) {
            this.emitter.removeAllListeners(eventName);
        }
        else {
            this.emitter.removeAllListeners();
        }
        return this;
    }
}
exports.EnhancedEventEmitter = EnhancedEventEmitter;
