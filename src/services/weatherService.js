import Cache from "./cacheService";
import { getWeather } from "./weatherClient";

/**@getWeatherForeach takes as argument an array of locations and returns weather info's for each location*/
/**@getForecast takes as argument a single location and returns the forecast for the next 4 days */
class WeatherService {
  constructor() {
    this.cache = new Cache(60 * 19); // 19 min threshold
  }

  getWeatherForeach = async locations => {
    return await Promise.all(
      locations.map(loc => {
        return this.getWeather(loc).catch(err => {
          console.log(err);
          return null;
        });
      })
    );
  };

  getWeather = async location => {
    const fromCache = await this.cache.getItem(location.id);
    if (!fromCache) {
      const fromFetch = await getWeather(location.lat, location.lon);
      if (!fromFetch) return Promise.reject(null);
      await this.cache.setItems(location.id, fromFetch);
      return fromFetch;
    }
    delete fromCache.expTime;
    return fromCache;
  };

  removeWeather = async key => {
    await this.cache.removeItem(key);
  };
}

export default WeatherService;
