import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import GestureRecognizer from "react-native-swipe-gestures";
// services
import { getLocationAsync } from "../../../services/reverseGeocoding";
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
    this.storage = new Storage();
  }

  componentDidMount() {
    this.updateHome();
  }

  updateHome = async () => {
    this.updateDate();
    const CURRENT_LOCATION = "CURRENT_LOCATION";
    const location = await this.storage.getItem(CURRENT_LOCATION);
    if (!location) {
      const newLocation = await getLocationAsync();
      if (!newLocation)
        return this.setState({
          errorMessage: "Permission to access location was denied"
        });

      this.setState({ location: newLocation });
      await this.storage.setItem(CURRENT_LOCATION, newLocation);
      return;
    }

    this.setState({ location });

    // compare CURRENT_LOCATION with the actual device location
    const deviceLocation = await getLocationAsync();
    if (
      location.lat !== deviceLocation.lat &&
      location.lon !== deviceLocation.lon
    ) {
      this.setState({ location: deviceLocation });
      await this.storage.setItem(CURRENT_LOCATION, deviceLocation);
      return;
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
    date = `${days[date.getDay()]}, ${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
    return this.setState({ date });
  };

  toggleSideMenu = () => {
    this.setState({ isToggledOn: !this.state.isToggledOn });
  };

  swipeRight = () => {
    return this.state.isToggledOn
      ? false
      : this.setState({ isToggledOn: true });
  };

  swipeLeft = () => {
    return this.state.isToggledOn
      ? this.setState({ isToggledOn: false })
      : false;
  };

  render() {
    const { location, date, isToggledOn } = this.state;
    const { navigation } = this.props;
    const { backgroundColor, foregroundColor } = this.context;
    return (
      <>
        <GestureRecognizer
          onSwipeRight={this.swipeRight}
          onSwipeLeft={this.swipeLeft}
        >
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
        </GestureRecognizer>
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
