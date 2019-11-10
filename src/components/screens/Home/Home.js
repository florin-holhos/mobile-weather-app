import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ToolbarAndroidComponent
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

// current location setup
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { getAddress } from "../../../services/reverseGeocoding";
import { getWeather } from "../../../services/weatherClient";

// components
import Search from "../../Search";
import WeatherContainer from "../../WeatherContainer";

export default class Home extends Component {
  static navigationOptions = {
    headerStyle: {
      display: "none"
    }
  };
  constructor() {
    super();
    this.state = {
      locations: null,
      currentLocationName: null,
      weather: null,
      loading: true
    };
  }

  componentDidMount() {
    this.getLocationAsync();
  }

  // get current location
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    const address = await getAddress(
      location.coords.latitude,
      location.coords.longitude
    );
    this.setState({
      currentLocationName: `${address.village || address.city}, ${
        address.country
      }`
    });
    const weather = await getWeather(
      location.coords.latitude,
      location.coords.longitude
    );
    this.setState({ weather });
  };

  handleSearch = item => {
    const { navigation } = this.props;
    navigation.navigate("Forecast", { location: item });
  };

  render() {
    const { currentLocationName, weather } = this.state;
    return (
      <ScrollView>
        <LinearGradient
          style={this.styles.container}
          colors={["#4a00e0", "#8e2de2"]}
        >
          <Search handleSearch={this.handleSearch} />
          <WeatherContainer
            location={{ name: currentLocationName, weather: weather }}
          />
        </LinearGradient>
      </ScrollView>
    );
  }
  styles = StyleSheet.create({
    container: {
      height: 700,
      padding: 10
    }
  });
}
