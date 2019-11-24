import { AsyncStorage } from "react-native";

/** Storage class provides services for storing
 data into @LocalStorage and @SessionStorage **/

/**@constructor creates a new instance based on parameter (sessionStorage, localStorage)*/
/** default storage is localStorage */
class Storage {
  constructor() {
    this.store = AsyncStorage;
  }

  /**@setItems method stores data into selected storage */
  setItem = async (key, value) => {
    try {
      await this.store.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Error saving data
      console.log("Error while saving data...");
    }
  };

  /**@getItems method returns stored data from the storage */
  getItem = async key => {
    try {
      const data = JSON.parse(await this.store.getItem(key));
      return data || null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  removeItem = async key => {
    await this.store.removeItem(key);
  };
}

export default Storage;
