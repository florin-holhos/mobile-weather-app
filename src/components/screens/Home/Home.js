import React, { Component, useContext } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// services
import { getLocationAsync } from "../../../services/reverseGeocoding";
import WeatherService from "../../../services/weatherService";
import Storage from "../../../services/storageService";

// components
import WeatherContainer from "../../WeatherContainer";
import { LocationContext } from "../../LocationContext";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
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
      date: null,
      errorMessage: null,
      isToggledOn: false
    };
    this.weatherService = new WeatherService();
    this.storage = new Storage();
  }

  componentDidMount() {
    this.updateHome();
  }

  updateHome = async () => {
    this.updateDate();
    const CURRENT_LOCATION = "CURRENT_LOCATION";
    let location = await this.storage.getItem(CURRENT_LOCATION);

    if (!location) {
      location = await getLocationAsync();
      if (!location)
        return this.setState({
          errorMessage: "Permission to access location was denied"
        });
      await this.storage.setItem(CURRENT_LOCATION, location);
    }

    this.setState({ location });

    // check if current location is valid
    this.checkCurrentLocation(location);
  };

  checkCurrentLocation = async location => {
    const deviceLocation = await getLocationAsync();
    if (location.name !== deviceLocation.name) {
      // change the current location
      this.setState({ location: deviceLocation });
      await this.storage.setItem(CURRENT_LOCATION, deviceLocation);
    }
  };

  // get current time
  updateDate = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
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
    date = `${days[date.getDay()]} ${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
    return this.setState({ date });
  };

  toggleSideMenu = () => {
    this.setState({ isToggledOn: !this.state.isToggledOn });
  };

  render() {
    const { location, date, isToggledOn } = this.state;
    const { navigation } = this.props;
    const { backgroundColor, foregroundColor } = this.context;
    return (
      <>
        <SideMenu
          toggleSideMenu={this.toggleSideMenu}
          isToggledOn={isToggledOn}
          navigation={navigation}
        />
        {(navigation && location && (
          <ScrollView style={{ backgroundColor: backgroundColor }}>
            <View style={this.styles.container}>
              <Header
                navigation={navigation}
                location={location}
                toggleSideMenu={this.toggleSideMenu}
              />
              <Text style={[this.styles.date, { color: foregroundColor }]}>
                {date && date}
              </Text>
              <WeatherContainer location={location} />
            </View>
          </ScrollView>
        )) || (
          <ActivityIndicator
            size="large"
            color="#e94c89"
            style={{ height: 220 }}
          />
        )}
      </>
    );
  }

  styles = StyleSheet.create({
    container: {
      padding: 15
    },
    date: { fontSize: 12, opacity: 0.6 }
  });
}
