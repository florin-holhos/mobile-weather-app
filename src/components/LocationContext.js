import React, { Component } from "react";
import weatherService from "../services/weatherService";
import Storage from "../services/storageService";

export const LocationContext = React.createContext();

export default class LocationProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      backgroundColor: "#fff",
      foregroundColor: "#000"
    };
    this.storage = new Storage();
    this.weatherService = weatherService;
    this.userLocations = "USER_LOCATIONS";
  }

  componentDidMount() {
    this.getLocationsFromStorage();
  }

  getLocationsFromStorage = async () => {
    const locations = await this.storage.getItem(this.userLocations);
    if (Array.isArray(locations) && locations.length) {
      this.setState({ locations });
      this.updateWeatherForeach(locations);
    }
  };

  // cache weather info for stored locations to improve loading time
  updateWeatherForeach = async locations => {
    await this.weatherService.getWeatherForeach(locations);
  };

  setDayTime = dayTime => {
    if (dayTime === "night")
      this.setState({ backgroundColor: "#33283b", foregroundColor: "#fff" });
    if (dayTime === "day")
      this.setState({ backgroundColor: "#fff", foregroundColor: "#000" });
  };

  updateLocations = async location => {
    const locations = [...this.state.locations, location];
    this.setState({ locations });
    await this.storage.setItem(this.userLocations, locations);
  };

  removeLocation = async location => {
    // remove from state
    const locations = this.state.locations.filter(
      loc => loc.id !== location.id
    );
    this.setState({ locations });
    // remove weather
    await this.storage.removeItem(location.id);
    // overwrite locations with the new array
    await this.storage.setItem(this.userLocations, locations);
  };

  render() {
    const { children } = this.props;
    const { locations, backgroundColor, foregroundColor } = this.state;
    return (
      <LocationContext.Provider
        value={{
          locations: locations,
          updateLocations: this.updateLocations,
          removeLocation: this.removeLocation,
          setDayTime: this.setDayTime,
          backgroundColor: backgroundColor,
          foregroundColor: foregroundColor
        }}
      >
        {children}
      </LocationContext.Provider>
    );
  }
}
