import { AsyncStorage } from "react-native";
export default class Storage {
  constructor() {
    this.store = AsyncStorage;
  }

  /**@setItemmethod stores data into selected storage */
  setItem = async (key, value) => {
    try {
      await this.store.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Error saving data
      console.log("Error while saving data...");
    }
  };

  /**@getItem method returns stored data from the storage */
  getItem = async key => {
    try {
      let data = await this.store.getItem(key);
      data = JSON.parse(data);
      return data || null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  removeItem = async key => {
    try {
      await this.store.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  };
}
