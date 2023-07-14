/**
 * @description Creates a function that takes a key and a function that returns a promise.
 * @returns a function that takes a key and a function that returns a promise.
 * @example
 * const getOrCreatePromise = createGetOrCreatePromiseFn();
 *
 * const createP1 = getOrCreateProducer('p1', createProducer);
 * const createP1_2 = getOrCreateProducer('p1', createProducer);
 *
 * ```Both createP1 and createP1_2 will return the same promise.```
 */
export declare const createGetOrCreatePromiseFn: <K, V>() => (key: K, create: () => Promise<V>) => Promise<V>;
//# sourceMappingURL=createGetOrCreatePromiseFn.d.ts.map