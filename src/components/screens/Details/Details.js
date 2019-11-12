import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import WeatherContainer from "../../WeatherContainer";
export default class Details extends Component {
  state = {
    weather: null
  };

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.location.name}`,
    headerRight: (
      <Ionicons
        name="md-trash"
        size={32}
        color="#222"
        style={{ marginRight: 20 }}
      />
    )
  });

  render() {
    const { navigation } = this.props;
    const location = navigation.getParam("location", null);
    return (
      <ScrollView>
        <View style={this.styles.container}>
          <Text style={this.styles.now}>Now</Text>
          {location && <WeatherContainer location={location} />}
        </View>
      </ScrollView>
    );
  }
  styles = StyleSheet.create({
    container: {
      padding: 15,
      height: 700,
      backgroundColor: "#eee"
    },
    now: {
      fontWeight: "bold",
      fontSize: 22,
      marginTop: 20,
      marginBottom: -30
    }
  });
}
