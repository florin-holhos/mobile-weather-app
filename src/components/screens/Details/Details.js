import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default class Details extends Component {
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
        <View style={this.styles.container}></View>
      </ScrollView>
    );
  }
  styles = StyleSheet.create({
    container: {
      padding: 10,
      height: 700
    }
  });
}
