import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function WeatherContainer({ weather }) {
  console.log(weather && weather.currently);

  return (
    <>
      {weather && (
        <ScrollView style={styles.container}>
          <View style={styles.weather}>
            <Image source={require("img/")}></Image>
          </View>
          <View style={styles.details}></View>
          <View style={styles.forecast}></View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  weather: {},
  details: {},
  forecast: {}
});
