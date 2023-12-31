type Events = Record<string, unknown[]>;
declare class EnhancedEventEmitter<E extends Events = Events> {
    private emitter;
    constructor();
    on<K extends keyof E>(eventName: K, listener: (...args: E[K]) => void): this;
    off<K extends keyof E>(eventName: K, listener: (...args: E[K]) => void): this;
    listenerCount<K extends keyof E>(eventName: K): number;
    listeners<K extends keyof E>(eventName: K): ((...args: E[K]) => void)[];
    emit<K extends keyof E>(eventName: K, ...args: E[K]): boolean;
    safeEmit<K extends keyof E>(eventName: K, ...args: E[K]): boolean;
    protected once<K extends keyof E>(eventName: K, listener: (args: E[K]) => void): this;
    protected removeAllListeners<K extends keyof E>(eventName?: K): this;
}
export { EnhancedEventEmitter };
//# sourceMappingURL=EnhancedEventEmitter.d.ts.map