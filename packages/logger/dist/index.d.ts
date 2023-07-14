declare class Logger {
    private prefix;
    constructor(fileName: string);
    private logWithPrefix;
    debug(data: any): void;
    info(data: any): void;
    warn(data: any): void;
    error(data: any): void;
}
export default Logger;
//# sourceMappingURL=index.d.ts.map