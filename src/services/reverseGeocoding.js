import axios from "axios";
// current location setup
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const getAddress = async (lat, lon) => {
  const key = "a89bd9f9cf7ca3";
  const url = `https://eu1.locationiq.com/v1/reverse.php?key=${key}&lat=${lat}&lon=${lon}&format=json`;
  try {
    const response = await axios.get(url);
    return response.data.address;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// get current location
export const getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    return null;
  }

  const position = await Location.getCurrentPositionAsync();
  const { latitude, longitude } = position.coords;
  const address = await getAddress(latitude, longitude);
  const location = {
    name: address.village || address.city,
    lat: latitude,
    lon: longitude
  };

  // generate id
  location.id = uuid4();

  return location;
};
