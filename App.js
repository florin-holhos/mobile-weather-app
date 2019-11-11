import React, { Component } from "react";

// components
import Home from "./src/components/screens/Home/Home";
import Details from "./src/components/screens/Details/Details";

// naviation
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// navigation setup
const RootStack = createStackNavigator(
  {
    Home: Home,
    Details: Details
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
