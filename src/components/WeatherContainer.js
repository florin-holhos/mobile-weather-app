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
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      loading: true
    };
  }

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
    console.log(weather);
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

            {/**@details */}

            <View style={this.styles.details}>
              <View style={this.styles.sectionHeader}>
                <Text style={{ fontSize: 16 }}>Details</Text>
                <View style={this.styles.hr} />
              </View>
              <View style={this.styles.section}>
                <View style={this.styles.sectionItem}>
                  <Text>Icon</Text>
                  <Text style={this.styles.sectionInnerText}>Feels like</Text>
                  <Text style={this.styles.sectionInfo}>
                    {Math.round(weather.currently.apparentTemperature)}&#176;C
                  </Text>
                </View>
                <View style={this.styles.sectionItem}>
                  <Text>Icon</Text>
                  <Text style={this.styles.sectionInnerText}>Wind</Text>
                  <Text style={this.styles.sectionInfo}>
                    {Math.round(weather.currently.windSpeed)} km/h
                  </Text>
                </View>
                <View style={this.styles.sectionItem}>
                  <Text>Icon</Text>
                  <Text style={this.styles.sectionInnerText}>Humidity</Text>
                  <Text style={this.styles.sectionInfo}>
                    {weather.currently.humidity * 100}%
                  </Text>
                </View>
              </View>
              <View style={this.styles.section}>
                <View style={this.styles.sectionItem}>
                  <Text>Icon</Text>
                  <Text style={this.styles.sectionInnerText}>Pressure</Text>
                  <Text style={this.styles.sectionInfo}>
                    {weather.currently.pressure} hPa
                  </Text>
                </View>
                <View style={this.styles.sectionItem}>
                  <Text>Icon</Text>
                  <Text style={this.styles.sectionInnerText}>Visibility</Text>
                  <Text style={this.styles.sectionInfo}>
                    {Math.round(weather.currently.visibility)}km
                  </Text>
                </View>
                <View style={this.styles.sectionItem}>
                  <Text>Icon</Text>
                  <Text style={this.styles.sectionInnerText}>
                    Chances of rain
                  </Text>
                  <Text style={this.styles.sectionInfo}>
                    {Math.round(weather.currently.precipProbability * 100)}%
                  </Text>
                </View>
              </View>
            </View>

            {/**@forecast */}

            <View style={[this.styles.forecast, { marginTop: 30 }]}>
              <View style={this.styles.sectionHeader}>
                <Text style={{ fontSize: 16 }}>Next 4 days</Text>
                <View style={this.styles.hr} />
              </View>
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
    sectionHeader: {
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    hr: {
      backgroundColor: "#222",
      height: 1,
      flexGrow: 0.96
    },
    details: {
      display: "flex"
    },

    section: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15
    },
    sectionItem: {
      backgroundColor: "#ccc",
      height: 110,
      width: "30%",
      borderRadius: 5,
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center"
    },
    sectionInnerText: {
      fontSize: 12
    },
    sectionInfo: {
      fontWeight: "bold"
    },
    forecast: {
      display: "flex"
    }
  });
}
