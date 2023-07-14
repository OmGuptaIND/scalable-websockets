"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCompareFn = void 0;
const defaultCompareFn = (a, b) => {
    if (a < b) {
        return false;
    }
    if (a > b) {
        return true;
    }
    return false;
};
exports.defaultCompareFn = defaultCompareFn;
class EnhancedMap {
    get size() {
        return this.map.size;
    }
    constructor(data) {
        this.getKey = (a, b) => {
            const key = this.compareFn(a, b) ? `${a}_${b}` : `${b}_${a}`;
            return key;
        };
        this.get = (a, b) => {
            const key = this.getKey(a, b);
            const value = this.map.get(key);
            return value;
        };
        this.set = (a, b, value) => {
            const key = this.getKey(a, b);
            this.map.set(key, value);
            return value;
        };
        this.map = new Map();
        if (data.compareFn)
            this.compareFn = data.compareFn;
        else
            this.compareFn = exports.defaultCompareFn;
    }
}
exports.default = EnhancedMap;
