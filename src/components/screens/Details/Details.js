import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import WeatherContainer from "../../WeatherContainer";
import { LocationContext } from "../../LocationContext";
export default class Details extends Component {
  state = {
    weather: null
  };

  static contextType = LocationContext;

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.location.name}`
  });

  handleRemove = location => {
    this.context.removeLocation(location);
  };

  render() {
    const { navigation } = this.props;
    const location = navigation.getParam("location", null);
    return (
      <ScrollView>
        <View style={this.styles.container}>
          <View style={this.styles.headerContainer}>
            <Text style={this.styles.now}>Now</Text>
            <TouchableOpacity
              style={this.styles.removeBtn}
              onPress={() => {
                this.handleRemove(location);
                navigation.navigate("Home");
              }}
            >
              <Ionicons name="md-trash" size={40} />
            </TouchableOpacity>
          </View>
          {location && <WeatherContainer location={location} />}
        </View>
      </ScrollView>
    );
  }
  styles = StyleSheet.create({
    container: {
      padding: 15,
      height: 1200,
      backgroundColor: "#eee"
    },
    headerContainer: {
      marginBottom: -30,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    now: {
      fontWeight: "bold",
      fontSize: 22
    },
    removeBtn: {
      padding: 20,
      marginRight: -20,
      zIndex: 2
    }
  });
}
