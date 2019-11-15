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
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ translateY: 100 }}
          />
        )}
        {weather && (
          <ScrollView style={this.styles.container}>
            <View style={this.styles.weather}>
              <Image
                style={this.styles.weatherImg}
                resizeMode="cover"
                source={images.weather[weather.currently.icon]}
              />

              <Text style={this.styles.temp}>
                {Math.round(weather.currently.temperature)}&#176;
              </Text>
              <Text
                style={{ fontSize: 12, fontWeight: "bold", color: "#e94c89" }}
              >
                {weather.currently.summary}
              </Text>
            </View>

            {/**@details */}

            <View style={this.styles.details}>
              <View style={this.styles.infoItem}>
                <Text style={this.styles.infoText}>
                  {Math.round(weather.currently.windSpeed)}km/h
                </Text>
                <Text style={this.styles.info}>Wind</Text>
              </View>
              <View style={this.styles.infoItem}>
                <Text style={this.styles.infoText}>
                  {Math.round(weather.currently.humidity)}%
                </Text>
                <Text style={this.styles.info}>Humidity</Text>
              </View>
              <View style={this.styles.infoItem}>
                <Text style={this.styles.infoText}>
                  {Math.round(weather.today.temperatureHigh)}&#176;
                </Text>
                <Text style={this.styles.info}>Maximum</Text>
              </View>
            </View>

            {/**@forecast */}

            <View style={[this.styles.forecast, { marginTop: 30 }]}></View>
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
      alignItems: "center"
    },
    weatherImg: {
      marginTop: 30,
      marginBottom: 15,
      width: Dimensions.get("window").width * 0.6,
      overflow: "visible",
      height: 150
    },
    temp: {
      fontSize: 60,
      marginRight: -18
    },
    details: {
      marginTop: 50,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly"
    },
    infoItem: {
      alignItems: "center"
    },
    info: { fontSize: 12, color: "rgba(0,0,0,0.7)", marginTop: 5 },
    infoText: {
      fontWeight: "bold",
      fontSize: 18
    }
  });
}
