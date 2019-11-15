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

export const getWeather = async (lat, long) => {
  const url = "https://api.darksky.net/forecast";
  const key = "1a6ad86265bf2ea3c3cab3fc8795b886";

  try {
    const response = await axios.get(
      `${url}/${key}/${lat},${long}?exclude=minutely,hourly,alerts,flags&units=ca`
    );

    // format response
    const data = response.data;
    const weather = data.daily.data.slice(0, 5).map(day => {
      return {
        ...day,
        dayOfWeek: days[new Date(day.time * 1000).getDay()]
      };
    });

    return {
      currently: data.currently,
      today: weather[0],
      forecast: weather.slice(1, 5)
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};
