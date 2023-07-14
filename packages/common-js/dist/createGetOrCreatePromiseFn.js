"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetOrCreatePromiseFn = void 0;
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
const createGetOrCreatePromiseFn = () => {
    const map = new Map();
    return (key, createPromise) => {
        const existingPromise = map.get(key);
        if (existingPromise)
            return existingPromise;
        const newPromise = createPromise()
            .then((data) => {
            map.delete(key);
            return data;
        })
            .catch((err) => {
            map.delete(key);
            throw err;
        });
        map.set(key, newPromise);
        return newPromise;
    };
};
exports.createGetOrCreatePromiseFn = createGetOrCreatePromiseFn;
