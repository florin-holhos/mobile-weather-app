import React, { Component } from "react";

// services
import { getLocationAsync } from "../services/reverseGeocoding";
import weatherService from "../services/weatherService";
import Storage from "../services/storageService";

export const LocationContext = React.createContext();

export default class LocationProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      currentLocation: null,
      backgroundColor: "#fff",
      foregroundColor: "#000"
    };
    this.storage = new Storage();
    this.weatherService = weatherService;
    this.USER_LOCATIONS = "USER_LOCATIONS";
    this.CURRENT_LOCATION = "CURRENT_LOCATION";
  }

  componentDidMount() {
    this.updateCurrentLocation();
    this.updateLocationsFromStorage();
  }

  updateLocationsFromStorage = async () => {
    const locations = await this.storage.getItem(this.USER_LOCATIONS);
    if (Array.isArray(locations) && locations.length) {
      this.setState({ locations });
      this.updateWeatherForeach(locations);
    }
  };

  updateCurrentLocation = async () => {
    const currentLocation = await this.storage.getItem(this.CURRENT_LOCATION);
    if (!currentLocation) {
      const newLocation = await getLocationAsync();
      if (!newLocation) throw Error("Permission not granted!");
      this.setState({ currentLocation: newLocation });
      await this.storage.setItem(this.CURRENT_LOCATION, newLocation);
      return;
    }

    this.setState({ currentLocation });

    // compare this.CURRENT_LOCATION with the actual device location
    const deviceLocation = await getLocationAsync();
    if (
      currentLocation.lat !== deviceLocation.lat &&
      currentLocation.lon !== deviceLocation.lon
    ) {
      this.setState({ currentLocation: deviceLocation });
      await this.storage.setItem(this.CURRENT_LOCATION, deviceLocation);
      return;
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
    await this.storage.setItem(this.USER_LOCATIONS, locations);
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
    await this.storage.setItem(this.USER_LOCATIONS, locations);
  };

  render() {
    const { children } = this.props;
    const {
      locations,
      currentLocation,
      backgroundColor,
      foregroundColor
    } = this.state;
    return (
      <LocationContext.Provider
        value={{
          locations: locations,
          currentLocation: currentLocation,
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
