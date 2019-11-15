import React, { Component } from "react";
import SearchBar from "./SearchBar";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
export default class Header extends Component {
  state = {
    show: false
  };

  toggleSearchBar = () => this.setState({ show: !this.state.show });

  render() {
    const { navigation, location } = this.props;
    const { show } = this.state;
    return (
      <View style={this.styles.headerContainer}>
        {show && <SearchBar navigation={navigation} />}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Text style={this.styles.location}>{location.name}</Text>
          <TouchableOpacity
            style={{
              padding: 10,
              marginRight: -10,
              marginBottom: -10
            }}
            onPress={this.toggleSearchBar}
          >
            <Ionicons name={show ? "md-close" : "md-search"} size={32} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  styles = StyleSheet.create({
    headerContainer: {
      marginTop: 80
    },
    location: {
      fontSize: 22,
      maxWidth: 280
    }
  });
}
