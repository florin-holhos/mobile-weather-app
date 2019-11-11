import axios from "axios";

const icons = {
  "clear-day": "img/weather/day_clear.png",
  "clear-night": "img/weather/night_clear.png",
  rain: "img/weather/rain.png",
  snow: "img/weather/snow.png",
  sleet: "img/weather/sleet.png",
  wind: "img/weather/wind.png",
  fog: "img/weather/fog.png",
  cloudy: "img/weather/cloudy.png",
  "partly-cloudy-day": "img/weather/day_partial_cloud.png",
  "partly-cloudy-night": "img/weather/night_partial_cloud.png"
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const getWeather = async (lat, long) => {
  const url = "https://api.darksky.net/forecast";
  const key = "143939d9da0372cdb21039ddf16647df";

  try {
    const response = await axios.get(
      `${url}/${key}/${lat},${long}?exclude=minutely,hourly,alerts,flags&units=si`
    );

    // format response
    const weather = response.data;
    const currently = weather.currently;
    currently.imgSrc = icons[weather.currently.icon];
    const forecast = weather.daily.data.slice(1, 5).map(day => {
      return {
        ...day,
        imgSrc: icons[day.icon],
        dayOfWeek: days[new Date(day.time * 1000).getDay()]
      };
    });

    return { currently: currently, forecast: forecast };
  } catch (err) {
    console.log(err);
    return null;
  }
};
