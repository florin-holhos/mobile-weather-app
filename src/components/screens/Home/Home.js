import React, { Component, useContext } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { getLocationAsync } from "../../../services/reverseGeocoding";

// components
import WeatherContainer from "../../WeatherContainer";
import { LocationContext } from "../../LocationContext";
import Header from "../../Header";
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
      location: null,
      loading: true,
      date: null,
      errorMessage: null
    };
    this.timeout = null; // initialize in updateTime method
  }

  async componentDidMount() {
    this.updateDate();
    const location = await getLocationAsync();
    if (!location)
      return this.setState({
        errorMessage: "Permission to access location was denied"
      });

    this.setState({
      location: location,
      loading: false
    });
    // update context
    this.context.updateLocations(location);
  }

  componentWillUnmount() {
    // remove timer on unmount
    clearTimeout(this.timeout);
  }

  // get current time
  updateDate = () => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let date = new Date();
    date = `${days[date.getDay() - 1]} ${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
    return this.setState({ date });
  };

  render() {
    const { location, date, loading } = this.state;
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={this.styles.container}>
          {navigation && location && (
            <Header navigation={navigation} location={location} />
          )}
          {loading && (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={{ marginTop: 40 }}
            />
          )}
          {location && (
            <>
              <Text style={this.styles.date}>{date && date}</Text>
              <WeatherContainer location={location} />
            </>
          )}
        </View>
      </ScrollView>
    );
  }

  styles = StyleSheet.create({
    container: {
      height: 1000,
      padding: 15
    },
    date: { fontSize: 12, color: "rgba(0,0,0,0.7)" }
  });
}
