import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function WeatherContainer({ location }) {
  const { name, weather } = location;
  console.log(weather && weather.currently);

  return (
    <>
      <Text style={styles.locationName}>{name && name}</Text>
      {weather && (
        <View style={styles.container}>
          <View style={styles.currentWeather}>
            <View style={styles.summary}>
              <Text>{weather.currently.icon}</Text>
              <Text style={styles.summary}>{weather.currently.summary}</Text>
            </View>
            <Text style={styles.currentTemp}>
              {Math.round(weather.currently.temperature)}&#176;
            </Text>
          </View>

          <View style={styles.maxMin}>
            <Text style={styles.maxMinText}>
              {Math.round(weather.today.temperatureMax)}&#176; C
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#fff",
                width: 80
              }}
            />
            <Text style={styles.maxMinText}>
              {Math.round(weather.today.temperatureMin)}&#176; C
            </Text>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  locationName: {
    marginTop: 40,
    color: "#fff",
    fontSize: 18,
    textAlign: "center"
  },
  currentWeather: {
    display: "flex",
    flexDirection: "column"
  },
  summary: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 26,
    color: "#fff"
  },
  currentTemp: {
    fontSize: 120,
    color: "#fff",
    fontWeight: "200"
  },
  maxMin: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  maxMinText: {
    fontSize: 32,
    color: "#fff",
    padding: 5
  }
});
