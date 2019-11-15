import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import WeatherContainer from "../../WeatherContainer";
import { LocationContext } from "../../LocationContext";
import Header from "../../Header";
export default class Details extends Component {
  state = {
    weather: null
  };

  static contextType = LocationContext;

  static navigationOptions = {
    headerStyle: {
      display: "none"
    }
  };

  render() {
    const { navigation } = this.props;
    const location = navigation.getParam("location", null);
    return (
      <ScrollView>
        <View style={this.styles.container}>
          <Header navigation={navigation} location={location} />
          <Text style={{ fontSize: 12, color: "rgba(0,0,0,0.7)" }}>Now</Text>
          {location && <WeatherContainer location={location} />}
        </View>
      </ScrollView>
    );
  }
  styles = StyleSheet.create({
    container: {
      padding: 15,
      height: 1000
    }
  });
}
