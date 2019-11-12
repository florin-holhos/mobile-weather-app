import React, { Component } from "react";
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

export default class Home extends Component {
  static navigationOptions = {
    headerStyle: {
      display: "none"
    }
  };
  constructor() {
    super();
    this.state = {
      locations: null, // will be updated in the future
      currentLocation: null,
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
    const { latitude, longitude } = location.coords;
    const address = await getAddress(latitude, longitude);
    console.log(address);
    this.setState({
      currentLocation: {
        name: `${address.village || address.city}, ${address.county}, ${
          address.country
        }`,
        lat: latitude,
        lon: longitude
      },
      loading: false
    });
  };

  handleSearch = item => {
    const { navigation } = this.props;
    navigation.navigate("Details", { location: item });
  };

  render() {
    const { currentLocation, loading } = this.state;
    return (
      <ScrollView>
        <View style={this.styles.container}>
          <Search handleSearch={this.handleSearch} />
          {loading && (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={{ marginTop: 40 }}
            />
          )}
          {currentLocation && (
            <Text style={this.styles.currentLocationName}>
              {currentLocation.name}
            </Text>
          )}
          {currentLocation && <WeatherContainer location={currentLocation} />}
        </View>
      </ScrollView>
    );
  }
  styles = StyleSheet.create({
    container: {
      height: 700,
      padding: 10,
      backgroundColor: "#eee"
    },
    currentLocationName: {
      textAlign: "center",
      fontSize: 16,
      marginTop: 40,
      marginBottom: -20
    }
  });
}
