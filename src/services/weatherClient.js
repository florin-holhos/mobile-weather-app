import axios from "axios";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const getWeather = async (lat, lon) => {
  const url = "https://api.darksky.net/forecast";
  const key = "1a6ad86265bf2ea3c3cab3fc8795b886";
  let counter = new Date().getDay();

  try {
    const response = await axios.get(
      `${url}/${key}/${lat},${lon}?exclude=minutely,hourly,alerts,flags&units=ca`
    );

    // format response
    const data = response.data;
    const weather = data.daily.data.slice(0, 6).map(day => {
      counter = counter === days.length ? 0 : counter;
      return {
        ...day,
        dayOfWeek: days[counter++]
      };
    });

    return {
      currently: data.currently,
      today: weather[0],
      forecast: weather.slice(1, 6)
    };
  } catch (err) {
    return null;
  }
};
