export default class Query {
    private data;
    private key;
    private current;
    private _limit;
    private old;
    constructor(data: any[]);
    /**
     * Add a number to the selected value
     */
    add(val: number): this;
    /**
     * Gets back to the top level on the data
     */
    clearQuery(): this;
    /**
     * Delete the key
     */
    delete(key: string): this;
    /**
     * Divide the number
     */
    divide(val: number): this;
    /**
     * Check if the value is equal
     */
    equals(val: any): this;
    /**
     * Check if the data exists on every object
     */
    exists(key: string): boolean;
    /**
     * Find the key and matching value
     */
    find(key: string, val: any): void;
    /**
     * Check if a number value is greater
     */
    gt(val: number): this;
    /**
     * Check if a number value is greater or equal
     */
    gte(val: number): this;
    /**
     * Limit the number of outputs
     */
    limit(val: number): this;
    /**
     * Check if a number value is lesser
     */
    lt(val: number): this;
    /**
     * Check if a number value is greater or equal
     */
    lte(val: number): this;
    /**
     * Multiply the number
     */
    multiply(val: number): this;
    /**
     * Push a element to the selected array
     */
    push(val: any): this;
    /**
     * Delete elements and replace it by a value
     */
    splice(start: number, deleteCount?: number, items?: any[]): this;
    /**
     * Get the raw data
     */
    raw(): any[];
    /**
     * Update the selected value
     */
    update(val: any): this;
    /**
     * Get into a deeper object
     * @param {String} key
     */
    select(key: string): this;
    /**
     * Subtract the number
     */
    subtract(val: number): this;
    /**
     * Saves the queries on the data
     */
    save(): any[];
    /**
     * Get the Latest data
     */
    toJSON(): any[];
    /**
     * Get the last selected query
     */
    toValue(): any[];
    /**
     * Select a object to query next
     * @param {string} key
     */
    where(key: string): this;
}
