import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { images } from "../img/index";
import { getWeather } from "../services/weatherClient";

export default class WeatherContainer extends Component {
  state = {
    weather: null,
    loading: true
  };

  /**@important => mount this component only with location prop */
  componentDidMount() {
    const { location } = this.props;
    if (!location) {
      console.log("location prop missing...");
      return; // nothing to fetch for
    }
    this.updateWeather(location.lat, location.lon);
  }

  updateWeather = async (lat, lon) => {
    const weather = await getWeather(lat, lon);
    this.setState({ weather: weather, loading: false });
  };

  render() {
    const { weather, loading } = this.state;
    console.log(weather && weather.currently.icon);
    return (
      <>
        {loading && (
          <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />
        )}
        {weather && (
          <ScrollView style={this.styles.container}>
            <View style={this.styles.weather}>
              <Image
                style={this.styles.weatherImg}
                resizeMode="cover"
                source={images.weather[weather.currently.icon]}
              />
              <Text style={{ fontSize: 22, marginTop: 10, fontWeight: "bold" }}>
                {weather.currently.summary}
              </Text>
              <Text style={{ fontSize: 120 }}>
                {Math.round(weather.currently.temperature)}&#176;C
              </Text>
            </View>

            <View style={this.styles.details}>
              <Text>Details</Text>
            </View>
            <View style={this.styles.forecast}>
              <Text>Forecast</Text>
            </View>
          </ScrollView>
        )}
      </>
    );
  }
  styles = StyleSheet.create({
    container: {},
    weather: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20
    },
    weatherImg: {
      width: Dimensions.get("window").width * 0.8,
      overflow: "visible",
      height: 200
    },
    details: {
      display: "flex"
    },
    forecast: {
      display: "flex"
    }
  });
}
