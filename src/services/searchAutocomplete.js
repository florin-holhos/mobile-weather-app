import axios from "axios";

/**@searchAutocomplete function returns a list of suggestions based on input */

export const searchAutocomplete = async input => {
  const host = process.env.REACT_APP_PLACES_HOST;
  const key = process.env.REACT_APP_PLACES_KEY;
  const url = `${process.env.REACT_APP_PLACES_URL}location=${input}`;
  const options = {
    headers: {
      "x-rapidapi-host": host,
      "x-rapidapi-key": key
    }
  };

  try {
    const response = await axios.get(url, options);
    const results = await response.data.Results;
    return response.status === 200 ? results : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
