import React, { Component } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// components
import WeatherContainer from "../../WeatherContainer";
import { LocationContext } from "../../LocationContext";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
export default class Details extends Component {
  state = {
    isToggledOn: false,
    x: new Animated.Value(-100)
  };

  static contextType = LocationContext;

  static navigationOptions = {
    headerStyle: {
      display: "none"
    }
  };

  slide = () => {
    Animated.spring(this.state.x, {
      toValue: 0
    }).start();
    this.setState({
      visible: true
    });
  };

  toggleSideMenu = () =>
    this.setState({ isToggledOn: !this.state.isToggledOn });

  render() {
    const { isToggledOn } = this.state;
    const { navigation } = this.props;
    const location = navigation.getParam("location", null);
    const { backgroundColor, foregroundColor } = this.context;
    return (
      <>
        {isToggledOn && (
          <Animated.View
            style={{
              transform: [
                {
                  translateX: this.state.x
                }
              ]
            }}
          >
            <SideMenu toggleSideMenu={this.toggleSideMenu} />
          </Animated.View>
        )}
        <ScrollView style={{ backgroundColor: backgroundColor }}>
          <View style={this.styles.container}>
            <Header
              navigation={navigation}
              location={location}
              toggleSideMenu={this.toggleSideMenu}
            />
            <Text
              style={{ fontSize: 12, color: foregroundColor, opacity: 0.7 }}
            >
              Now
            </Text>
            {location && <WeatherContainer location={location} />}
          </View>
        </ScrollView>
      </>
    );
  }
  styles = StyleSheet.create({
    container: {
      padding: 15
    }
  });
}
