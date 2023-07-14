export type TEnhancedMapKeyOptions = string | number;
export declare const defaultCompareFn: (a: TEnhancedMapKeyOptions, b: TEnhancedMapKeyOptions) => boolean;
declare class EnhancedMap<T> {
    private map;
    private compareFn;
    private getKey;
    get size(): number;
    get: (a: TEnhancedMapKeyOptions, b: TEnhancedMapKeyOptions) => T | undefined;
    set: (a: TEnhancedMapKeyOptions, b: TEnhancedMapKeyOptions, value: T) => T;
    constructor(data: {
        compareFn?: typeof defaultCompareFn;
    });
}
export default EnhancedMap;
//# sourceMappingURL=EnhancedMap.d.ts.map