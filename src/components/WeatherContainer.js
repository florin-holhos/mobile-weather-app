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
import { LocationContext } from "./LocationContext";
export default class WeatherContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null
    };
  }

  static contextType = LocationContext;

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
    this.setState({ weather });
    return weather && String(weather.currently.icon).includes("night")
      ? this.context.setDayTime("night")
      : this.context.setDayTime("day");
  };

  render() {
    const { weather } = this.state;
    const { backgroundColor, foregroundColor } = this.context;
    // console.log(weather);
    return (
      <>
        {(weather && (
          <ScrollView
            style={
              ([this.styles.container], { backgroundColor: backgroundColor })
            }
          >
            <View style={this.styles.weather}>
              <Image
                style={this.styles.weatherImg}
                resizeMode="center"
                source={images.weather[weather.currently.icon]}
              />

              <Text style={[this.styles.temp, { color: foregroundColor }]}>
                {` ${Math.round(weather.currently.temperature).toString()}`}
                &#176;
              </Text>
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "#e94c89" }}
              >
                {weather.currently.summary}
              </Text>
            </View>

            {/**@details */}

            <View style={this.styles.details}>
              <View style={this.styles.infoItem}>
                <Text
                  style={[this.styles.infoText, { color: foregroundColor }]}
                >
                  {Math.round(weather.currently.windSpeed)}km/h
                </Text>
                <Text style={[this.styles.info, { color: foregroundColor }]}>
                  Wind
                </Text>
              </View>
              <View style={this.styles.infoItem}>
                <Text
                  style={[this.styles.infoText, { color: foregroundColor }]}
                >
                  {Math.round(weather.currently.humidity * 100)}%
                </Text>
                <Text style={[this.styles.info, { color: foregroundColor }]}>
                  Humidity
                </Text>
              </View>
              <View style={this.styles.infoItem}>
                <Text
                  style={[this.styles.infoText, { color: foregroundColor }]}
                >
                  {Math.round(weather.today.temperatureHigh)}&#176;
                </Text>
                <Text style={[this.styles.info, { color: foregroundColor }]}>
                  Maximum
                </Text>
              </View>
            </View>

            {/**@forecast */}

            <View style={this.styles.forecast}>
              {weather.forecast.map((day, index) => (
                <View key={`day_${index}`} style={this.styles.forecastItem}>
                  <Text
                    style={[this.styles.dayOfWeek, { color: foregroundColor }]}
                  >
                    {day.dayOfWeek}
                  </Text>
                  <Image
                    style={this.styles.smallWeatherImg}
                    resizeMode="center"
                    source={images.weather[day.icon]}
                  />
                  <Text
                    style={[
                      this.styles.smallInfoText,
                      { color: foregroundColor }
                    ]}
                  >
                    {` ${Math.round(day.temperatureHigh)}`}&#176;
                  </Text>
                  <View
                    style={{
                      width: 25,
                      borderBottomWidth: 1,
                      borderColor: foregroundColor
                    }}
                  />
                  <Text
                    style={[
                      this.styles.smallInfoText,
                      { color: foregroundColor, opacity: 0.4 }
                    ]}
                  >
                    {` ${Math.round(day.temperatureLow)}`}&#176;
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        )) || (
          <ActivityIndicator
            size="large"
            color="#e94c89"
            style={{ height: 400 }}
          />
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
      width: Dimensions.get("window").width * 0.5,
      overflow: "visible",
      height: 200
    },
    temp: {
      fontSize: 70
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
    info: { fontSize: 12, opacity: 0.6, marginTop: 5 },
    infoText: {
      fontSize: 18,
      fontWeight: "500"
    },
    forecast: {
      marginTop: 50,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    forecastItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly"
    },
    dayOfWeek: {
      fontSize: 10,
      fontWeight: "bold"
    },
    smallWeatherImg: {
      width: Dimensions.get("window").width * 0.1,
      overflow: "visible",
      height: 60
    },
    smallInfoText: {
      fontSize: 16
    }
  });
}
