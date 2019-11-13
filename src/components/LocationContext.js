import React, { Component } from "react";

export const LocationContext = React.createContext();

export default class LocationProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: null
    };
  }

  componentDidMount() {}

  componentDidUpdate() {
    //console.log(this.state.locations);
  }

  updateLocations = location => {
    let { locations } = this.state;
    locations = locations ? [...locations, location] : [location];
    this.setState({ locations });
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
    const { locations } = this.state;
    return (
      <LocationContext.Provider
        value={{
          locations: locations,
          updateLocations: this.updateLocations,
          removeLocation: this.removeLocation
        }}
      >
        {children}
      </LocationContext.Provider>
    );
  }
}
