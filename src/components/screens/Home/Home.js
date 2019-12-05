import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import GestureRecognizer from "react-native-swipe-gestures";

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
      date: null,
      errorMessage: null,
      isToggledOn: false
    };
  }

  componentDidMount() {
    this.updateDate();
<<<<<<< HEAD
  }
=======
    const CURRENT_LOCATION = "CURRENT_LOCATION";
    let location = await this.storage.getItem(CURRENT_LOCATION);
    if (!location) {
      location = await getLocationAsync();
      if (!location)
        return this.setState({
          errorMessage: "Permission to access location was denied"
        });
      this.storage.setItem(CURRENT_LOCATION, location);
    }

    this.setState({ location });

    // check if current location is valid
    const deviceLocation = await getLocationAsync();
    if (!deviceLocation) return;
    return location.name !== deviceLocation.name
      ? this.setState({ location: deviceLocation }) &&
          this.storage.setItem(CURRENT_LOCATION, deviceLocation)
      : false;
  };
>>>>>>> 561d970e288131e4ca6b2efa6bfdc8401c679d13

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
    const { date, isToggledOn } = this.state;
    const { navigation } = this.props;
    const { backgroundColor, foregroundColor, currentLocation } = this.context;
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
          {(navigation && currentLocation && (
            <ScrollView style={{ backgroundColor: backgroundColor }}>
              <View style={this.styles.container}>
                <Header
                  navigation={navigation}
                  location={currentLocation}
                  toggleSideMenu={this.toggleSideMenu}
                />
                <Text style={[this.styles.date, { color: foregroundColor }]}>
                  {date && date}
                </Text>
                <WeatherContainer location={currentLocation} />
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
