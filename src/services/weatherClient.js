import axios from "axios";

const icons = {
  "clear-day": "img/day_clear.png",
  "clear-night": "img/night_clear.png",
  rain: "img/rain.png",
  snow: "img/snow.png",
  sleet: "img/sleet.png",
  wind: "img/wind.png",
  fog: "img/fog.png",
  cloudy: "img/cloudy.png",
  "partly-cloudy-day": "img/day_partial_cloud.png",
  "partly-cloudy-night": "img/night_partial_cloud.png"
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
    const today = weather.daily.data[0];
    const forecast = weather.daily.data.slice(1, 5).map(day => {
      return {
        ...day,
        imgSrc: icons[day.icon],
        dayOfWeek: days[new Date(day.time * 1000).getDay()]
      };
    });
    return { currently: currently, today: today, forecast: forecast };
  } catch (err) {
    console.log(err);
    return null;
  }
};
