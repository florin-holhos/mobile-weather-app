import Storage from "./storageService";

/**@threshold => time in seconds */
class Cache extends Storage {
  constructor(threshold) {
    super();
    this.threshold = threshold * 1000;
  }

  setItems = async (key, value) => {
    const expTime = new Date().getTime() + this.threshold;
    await super.getItem(key, { ...value, expTime });
  };

  getItems = async key => {
    const items = await super.getItem(key);
    if (items.length === 0) return null;
    if (items.expTime < new Date().getTime()) {
      await super.removeItem(key);
      return null;
    }
    return items;
  };

  removeItems = async key => {
    await super.removeItem(key);
  };
}

export default Cache;
