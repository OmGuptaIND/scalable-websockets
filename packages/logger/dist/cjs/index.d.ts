import * as tslog from "tslog";
declare class Logger {
    private logger;
    private meta;
    constructor(settings: tslog.ISettingsParam<tslog.ILogObj>, meta?: Record<string, unknown>);
    createSubLogger(name: string): tslog.Logger<tslog.ILogObj>;
    debug(message: string, fields?: Record<string, unknown>): void;
    info(message: string, fields?: Record<string, unknown>): void;
    warn(message: string, fields?: Record<string, unknown>): void;
    error(message: string, fields?: Record<string, unknown>): void;
}
export default Logger;
//# sourceMappingURL=index.d.ts.map