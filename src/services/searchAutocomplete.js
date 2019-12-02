import axios from "axios";

/**@searchAutocomplete function returns a list of suggestions based on input */

export const searchAutocomplete = async input => {
  const app_id = "JALXka6Qio2NlsCN7HDb";
  const app_code = "9p7Vx_ELYRBhPGTm1rUh7g";
  const url = `https://places.cit.api.here.com/places/v1/autosuggest?at=0,0&q=${input}&app_id=${app_id}&app_code=${app_code}`;
  const options = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const response = await axios.get(url, options);
    const results = await response.data.results;
    if (results.length === 0) return null;
    const citiesAndVillages = results.filter(result => {
      return result.category === "city-town-village";
    });

    const locations = citiesAndVillages.map(loc => ({
      name: `${loc.title}, ${String(loc.vicinity).replace("<br/>", ", ")}`,
      lat: loc.position[0],
      lon: loc.position[1]
    }));

    return locations;
  } catch (error) {
    console.log(error);
    return null;
  }
};
