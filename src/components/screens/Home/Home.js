import React, { Component, useContext } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// current location setup
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { getAddress } from "../../../services/reverseGeocoding";

// components
import Search from "../../Search";
import WeatherContainer from "../../WeatherContainer";
import { LinearGradient } from "expo-linear-gradient";
import { LocationContext } from "../../LocationContext";
export default class Home extends Component {
  static navigationOptions = {
    headerStyle: {
      display: "none"
    }
  };

  static contextType = LocationContext;

  constructor() {
    super();
    this.state = {
      currentLocation: null,
      loading: true,
      time: null
    };
    this.timeout = null; // initialize in updateTime method
  }

  componentDidMount() {
    this.getLocationAsync();
    this.updateTime();
  }

  componentWillUnmount() {
    // remove timer on unmount
    clearTimeout(this.timeout);
  }

  // get current location
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({ loading: false });
      return this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const address = await getAddress(latitude, longitude);
    const currentLocation = {
      name: `${address.village || address.city}, ${address.county}, ${
        address.country
      }`,
      lat: latitude,
      lon: longitude
    };
    this.setState({
      currentLocation: currentLocation,
      loading: false
    });
    // generate id
    currentLocation.id = uuid4();
    this.context.updateLocations(currentLocation);
  };

  // get current time
  updateTime = () => {
    const date = new Date();
    let timeFormat = date.toLocaleTimeString();
    timeFormat = timeFormat.slice(0, timeFormat.lastIndexOf(":"));
    const time = `${date.toDateString().slice(0, 3)}, ${timeFormat}`;
    // set a timer
    this.timeout = setTimeout(this.updateTime, 10000);
    if (time === this.state.time) return;
    this.setState({ time });
  };

  render() {
    const { locations, updateLocations } = this.context;
    const { currentLocation, time, loading } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <View style={this.styles.container}>
          <Search
            locations={locations}
            updateLocations={updateLocations}
            navigate={navigate}
          />
          {loading && (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={{ marginTop: 40 }}
            />
          )}
          {currentLocation && (
            <>
              <Text style={this.styles.currentLocationName}>
                {currentLocation.name}
              </Text>
              <Text style={{ textAlign: "center", marginTop: 10 }}>
                {time && time}
              </Text>
            </>
          )}

          {currentLocation && <WeatherContainer location={currentLocation} />}
        </View>
      </ScrollView>
    );
  }

  styles = StyleSheet.create({
    container: {
      height: 1200,
      padding: 15,
      backgroundColor: "#eee"
    },
    currentLocationName: {
      textAlign: "center",
      fontSize: 16,
      marginTop: 30
    }
  });
}
