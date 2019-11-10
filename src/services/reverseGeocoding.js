import axios from "axios";

export const getAddress = async (lat, lon) => {
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
