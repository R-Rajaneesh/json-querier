export default class Query {
  private data: any[];
  private key: string;
  private current: any[];
  private _limit: number | null;
  private old: any[];
  constructor(data: any[]) {
    this.old = JSON.parse(JSON.stringify(data));
    this.data = data.map((v, i) => ({ ...v, _$current: v, _$old: this.old[i] }));
    this.key = "";
    this.current = this.data.map((v, i) => ({ ...v, _$current: v, _$old: this.old[i] }));
    this._limit = null;
  }
  /**
   * Add a number to the selected value
   */
  public add(val: number) {
    this.current.forEach((d) => {
      d._$current[this.key] += val;
    });
    return this;
  }
  /**
   * Gets back to the top level on the data
   */
  public clearQuery() {
    this.current = this.data.map((v, i) => ({ ...v, _$current: v, _$old: this.old[i] }));
    return this;
  }
  /**
   * Delete the key
   */
  public delete(key: string) {
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
  public divide(val: number) {
    this.current.forEach((d) => {
      d._$current[this.key] /= val;
    });
    return this;
  }
  /**
   * Check if the value is equal
   */
  public equals(val: any) {
    this.current = this.current.filter((v, i) => v._$current[this.key] === val);
    return this;
  }
  /**
   * Check if the data exists on every object
   */
  public exists(key: string) {
    return this.current.every((v) => v[key]);
  }
  /**
   * Find the key and matching value
   */
  public find(key: string, val: any) {
    const res: any[] = [];
    return this.current.forEach((v) => {
      if (v._$current[key] === val) res.push(v);
    });
  }
  /**
   * Check if a number value is greater
   */
  public gt(val: number) {
    this.current = this.current.filter((v, i) => v._$current[this.key] > val);
    return this;
  }
  /**
   * Check if a number value is greater or equal
   */
  public gte(val: number) {
    this.current = this.current.filter((v, i) => v._$current[this.key] >= val);
    return this;
  }
  /**
   * Limit the number of outputs
   */
  public limit(val: number) {
    this._limit = val;
    return this;
  }
  /**
   * Check if a number value is lesser
   */

  public lt(val: number) {
    this.current = this.current.filter((v, i) => v._$current[this.key] < val);
    return this;
  }
  /**
   * Check if a number value is greater or equal
   */

  public lte(val: number) {
    this.current = this.current.filter((v, i) => v._$current[this.key] <= val);
    return this;
  }
  /**
   * Multiply the number
   */

  public multiply(val: number) {
    this.current.forEach((d) => {
      d._$current[this.key] *= val;
    });
    return this;
  }
  /**
   * Push a element to the selected array
   */
  public push(val: any) {
    this.current.forEach((d) => {
      if (Array.isArray(d._$current[this.key])) d._$current[this.key].push(val);
    });
    return this;
  }
  /**
   * Delete elements and replace it by a value
   */
  public splice(start: number, deleteCount?: number, items?: any[]) {
    this.current.forEach((d) => {
      if (Array.isArray(d._$current[this.key])) d._$current[this.key].splice(start, deleteCount, items);
    });

    return this;
  }
  /**
   * Get the raw data
   */
  public raw() {
    const data = this.current.map((v) => (v = v._$current));
    return data;
  }
  /**
   * Update the selected value
   */
  public update(val: any) {
    this.current.forEach((d) => {
      d._$current[this.key] = val;
    });
    return this;
  }
  /**
   * Get into a deeper object
   * @param {String} key
   */
  public select(key: string) {
    this.current.map((v, i) => (this.current[i]._$current = v[key]));
    return this;
  }
  /**
   * Subtract the number
   */
  public subtract(val: number) {
    this.current.forEach((d) => {
      d._$current[this.key] -= val;
    });
    return this;
  }
  /**
   * Saves the queries on the data
   */
  public save() {
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
  public toJSON() {
    return this.data.map((v, i) => ({ ...v }));
  }
  /**
   * Get the last selected query
   */
  public toValue() {
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
  public where(key: string) {
    this.key = `${key}`;
    return this;
  }
}

