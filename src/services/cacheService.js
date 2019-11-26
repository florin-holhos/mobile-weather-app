import Storage from "./storageService";

/**@threshold => time in seconds */
/**@default time is 19 min */
export default class Cache {
  constructor(threshold) {
    this.threshold = threshold ? threshold * 1000 : 19 * 60 * 1000;
    this.storage = new Storage();
  }

  setItem = async (key, value) => {
    const expTime = new Date().getTime() + this.threshold;
    try {
      await this.storage.setItem(key, { ...value, expTime });
    } catch (error) {
      console.log(error);
    }
  };

  getItem = async key => {
    let items = null;
    try {
      items = await this.storage.getItem(key);
    } catch (error) {
      console.log("Error when trying to get the items");
      return null;
    }

    if (!items || items.length === 0) return null;
    if (items.expTime < new Date().getTime()) {
      this.removeItem(key);
      return null;
    }
    return items;
  };

  removeItem = async key => {
    try {
      await this.storage.removeItem(key);
    } catch (error) {
      console.log("Error when trying to remove item...");
    }
  };
}
