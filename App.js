import React, { Component } from "react";

// components
import Home from "./src/components/screens/Home/Home";
import Forecast from "./src/components/screens/Forecast/Forecast";

// naviation
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// navigation setup
const RootStack = createStackNavigator(
  {
    Home: Home,
    Forecast: Forecast
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
