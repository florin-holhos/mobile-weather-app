import Storage from "./storageService";

/**@threshold => time in seconds */
export default class Cache {
  constructor(threshold) {
    this.storage = new Storage();
    this.threshold = threshold * 1000;
  }

  setItems = async (key, value) => {
    console.log(this.storage.setItem);
    // const expTime = new Date().getTime() + this.threshold;
    // try {
    //   await super.setItem(key, { ...value, expTime });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  getItems = async key => {
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

  removeItems = async key => {
    try {
      await this.storage.removeItem(key);
    } catch (error) {
      console.log("Error when trying to remove item...");
    }
  };
}
