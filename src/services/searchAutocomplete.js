import axios from "axios";

/**@searchAutocomplete function returns a list of suggestions based on input */

export const searchAutocomplete = async input => {
  const host = "devru-latitude-longitude-find-v1.p.rapidapi.com";
  const key = "f52d47d0a9msh399976bf74e6564p198b56jsnd57700a39a5a";
  const url = `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${input}`;
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
