import React, { Component } from "react";
import WeatherService from "../services/weatherService";
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
    this.weatherService = new WeatherService();
  }

  componentDidMount() {
    this.getLocationsFromStorage();
  }

  getLocationsFromStorage = async () => {
    const locations = await this.storage.getItem("USER_LOCATIONS");
    if (locations && locations.length) {
      this.setState({ locations });
      this.updateWeatherForeach(locations);
    }
  };

  // cache weather infos for locations to improve loading time
  updateWeatherForeach = async locations => {
    //await this.weatherService.getWeatherForeach(locations);
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
    await this.storage.setItem("USER_LOCATIONS", locations);
  };

  removeLocation = async location => {
    // remove from state
    const locations = this.state.locations.filter(
      loc => loc.id !== location.id
    );
    this.setState({ locations });
    // remove from storage
    this.storage.setItem("USER_LOCATIONS", locations);
  };

  render() {
    const { children } = this.props;
    const {
      locations,
      backgroundColor,
      foregroundColor,
      currentLocation
    } = this.state;
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
