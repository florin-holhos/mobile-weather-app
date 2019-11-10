import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default class Forecast extends Component {
  static navigationOptions = {
    title: "Forecast",
    headerStyle: {}
  };

  render() {
    const { navigation } = this.props;
    const location = navigation.getParam("location", null);
    return (
      <ScrollView style={this.styles.container}>
        <View style={this.styles.containerHead}>
          <Text style={this.styles.title}>{location && location.name}</Text>
          <Button title="Delete" />
        </View>
      </ScrollView>
    );
  }
  styles = StyleSheet.create({
    container: {
      padding: 10,
      height: 700
    },
    containerHead: {
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },

    title: {
      fontSize: 20
    }
  });
}
