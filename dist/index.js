"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Query {
    data;
    key;
    current;
    _limit;
    old;
    constructor(data) {
        this.old = JSON.parse(JSON.stringify(data));
        this.data = data.map((v, i) => ({ ...v, _$current: v, _$old: this.old[i] }));
        this.key = "";
        this.current = this.data.map((v, i) => ({ ...v, _$current: v, _$old: this.old[i] }));
        this._limit = null;
    }
    /**
     * Add a number to the selected value
     */
    add(val) {
        this.current.forEach((d) => {
            d._$current[this.key] += val;
        });
        return this;
    }
    /**
     * Gets back to the top level on the data
     */
    clearQuery() {
        this.current = this.data.map((v, i) => ({ ...v, _$current: v, _$old: this.old[i] }));
        return this;
    }
    /**
     * Delete the key
     */
    delete(key) {
        this.current = this.current.map((v, i) => {
            delete v._$current[key];
            v._$old = v;
            return (v = v);
        });
        return this;
    }
    /**
     * Divide the number
     */
    divide(val) {
        this.current.forEach((d) => {
            d._$current[this.key] /= val;
        });
        return this;
    }
    /**
     * Check if the value is equal
     */
    equals(val) {
        this.current = this.current.filter((v, i) => v._$current[this.key] === val);
        return this;
    }
    /**
     * Check if the data exists on every object
     */
    exists(key) {
        return this.current.every((v) => v[key]);
    }
    /**
     * Find the key and matching value
     */
    find(key, val) {
        const res = [];
        return this.current.forEach((v) => {
            if (v._$current[key] === val)
                res.push(v);
        });
    }
    /**
     * Check if a number value is greater
     */
    gt(val) {
        this.current = this.current.filter((v, i) => v._$current[this.key] > val);
        return this;
    }
    /**
     * Check if a number value is greater or equal
     */
    gte(val) {
        this.current = this.current.filter((v, i) => v._$current[this.key] >= val);
        return this;
    }
    /**
     * Limit the number of outputs
     */
    limit(val) {
        this._limit = val;
        return this;
    }
    /**
     * Check if a number value is lesser
     */
    lt(val) {
        this.current = this.current.filter((v, i) => v._$current[this.key] < val);
        return this;
    }
    /**
     * Check if a number value is greater or equal
     */
    lte(val) {
        this.current = this.current.filter((v, i) => v._$current[this.key] <= val);
        return this;
    }
    /**
     * Multiply the number
     */
    multiply(val) {
        this.current.forEach((d) => {
            d._$current[this.key] *= val;
        });
        return this;
    }
    /**
     * Push a element to the selected array
     */
    push(val) {
        this.current.forEach((d) => {
            if (Array.isArray(d._$current[this.key]))
                d._$current[this.key].push(val);
        });
        return this;
    }
    /**
     * Delete elements and replace it by a value
     */
    splice(start, deleteCount, items) {
        this.current.forEach((d) => {
            if (Array.isArray(d._$current[this.key]))
                d._$current[this.key].splice(start, deleteCount, items);
        });
        return this;
    }
    /**
     * Get the raw data
     */
    raw() {
        const data = this.current.map((v) => (v = v._$current));
        return data;
    }
    /**
     * Update the selected value
     */
    update(val) {
        this.current.forEach((d) => {
            d._$current[this.key] = val;
        });
        return this;
    }
    /**
     * Get into a deeper object
     * @param {String} key
     */
    select(key) {
        this.current.map((v, i) => (this.current[i]._$current = v[key]));
        return this;
    }
    /**
     * Subtract the number
     */
    subtract(val) {
        this.current.forEach((d) => {
            d._$current[this.key] -= val;
        });
        return this;
    }
    /**
     * Saves the queries on the data
     */
    save() {
        this.current = this.current.map((v, i) => (v = { ...v._$current }));
        this.data = this.current;
        const res = this.data.map((v, i) => {
            delete v["_$old"]["_$current"];
            delete v["_$current"];
            return (v = { ...v });
        });
        return res;
    }
    /**
     * Get the Latest data
     */
    toJSON() {
        return this.data.map((v, i) => ({ ...v }));
    }
    /**
     * Get the last selected query
     */
    toValue() {
        return this.current.map((v, i) => {
            v = { ...v._$current };
            delete v["_$old"];
            return v;
        });
    }
    /**
     * Select a object to query next
     * @param {string} key
     */
    where(key) {
        this.key = `${key}`;
        return this;
    }
}
exports.default = Query;
