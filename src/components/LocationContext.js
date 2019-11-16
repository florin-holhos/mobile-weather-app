import React, { Component } from "react";

export const LocationContext = React.createContext();

export default class LocationProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      backgroundColor: "#fff",
      foregroundColor: "#000"
    };
  }

  componentDidMount() {}

  componentDidUpdate() {
    //console.log(this.state.locations);
  }

  setDayTime = dayTime => {
    if (dayTime === "night")
      this.setState({ backgroundColor: "#33283b", foregroundColor: "#fff" });
    if (dayTime === "day")
      this.setState({ backgroundColor: "#fff", foregroundColor: "#000" });
  };

  updateLocations = location => {
    this.setState({ locations: [...this.state.locations, location] });
  };

  removeLocation = location => {
    // remove from state
    const locations = this.state.locations.filter(
      loc => loc.id !== location.id
    );
    this.setState({ locations });
    // remove from storage
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
