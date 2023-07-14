import { EventEmitter } from "events";

type Events = Record<string, unknown[]>;

class EnhancedEventEmitter<E extends Events = Events> {
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
    this.emitter.setMaxListeners(Infinity);
  }

  public on<K extends keyof E>(
    eventName: K,
    listener: (args: E[K]) => void,
  ): this {
    this.emitter.on(eventName as string, listener);
    return this;
  }

  public off<K extends keyof E>(
    eventName: K,
    listener: (args: E[K]) => void,
  ): this {
    this.emitter.off(eventName as string, listener);
    return this;
  }

  public listenerCount<K extends keyof E>(eventName: K): number {
    return this.emitter.listenerCount(eventName as string);
  }

  public listeners<K extends keyof E>(
    eventName: K,
  ): ((...args: E[K]) => void)[] {
    return this.emitter.listeners(eventName as string) as ((
      ...args: E[K]
    ) => void)[];
  }

  public emit<K extends keyof E>(eventName: K, ...args: E[K]): boolean {
    return this.emitter.emit(eventName as string, ...args);
  }

  public safeEmit<K extends keyof E>(eventName: K, ...args: E[K]): boolean {
    return this.emitter.emit(eventName as string, ...args);
  }

  protected once<K extends keyof E>(
    eventName: K,
    listener: (args: E[K]) => void,
  ): this {
    this.emitter.once(eventName as string, listener);
    return this;
  }

  protected removeAllListeners<K extends keyof E>(eventName?: K): this {
    if (eventName) {
      this.emitter.removeAllListeners(eventName as string);
    } else {
      this.emitter.removeAllListeners();
    }
    return this;
  }
}

export { EnhancedEventEmitter };
