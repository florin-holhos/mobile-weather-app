// workaround hack for dynamic importing images
export const images = {
  weather: {
    "clear-day": require("./weather/day_clear.png"),
    "clear-night": require("./weather/night_clear.png"),
    rain: require("./weather/rain.png"),
    snow: require("./weather/snow.png"),
    sleet: require("./weather/sleet.png"),
    wind: require("./weather/wind.png"),
    fog: require("./weather/fog.png"),
    cloudy: require("./weather/cloudy.png"),
    "partly-cloudy-day": require("./weather/day_partial_cloud.png"),
    "partly-cloudy-night": require("./weather/night_partial_cloud.png")
  },
  icons: {}
};
