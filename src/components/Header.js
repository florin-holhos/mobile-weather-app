import React, { Component } from "react";
import SearchBar from "./SearchBar";
import { View, StyleSheet, Text } from "react-native";
import {
  Ionicons,
  AntDesign,
  SimpleLineIcons,
  Entypo
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LocationContext } from "./LocationContext";

export default class Header extends Component {
  state = {
    show: false
  };

  static contextType = LocationContext;

  toggleSearchBar = () => this.setState({ show: !this.state.show });

  render() {
    const { foregroundColor } = this.context;
    const { navigation, location, toggleSideMenu } = this.props;
    const { show } = this.state;
    return (
      <>
        <View style={this.styles.headerContainer}>
          {(show && <SearchBar navigation={navigation} />) || (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                position: "absolute",
                width: "100%",
                top: -60
              }}
            >
              <TouchableOpacity
                style={[this.styles.menu]}
                onPress={toggleSideMenu}
              >
                <SimpleLineIcons
                  name="menu"
                  size={24}
                  color={foregroundColor}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={this.styles.home}
                onPress={() => {
                  navigation.push("Home");
                }}
              >
                <AntDesign name="home" size={28} color={foregroundColor} />
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Text style={[this.styles.location, { color: foregroundColor }]}>
              {location.name}
            </Text>

            <TouchableOpacity
              style={{
                padding: 10,
                marginRight: -10,
                marginBottom: -10
              }}
              onPress={this.toggleSearchBar}
            >
              <Ionicons
                name={show ? "md-close" : "md-search"}
                size={32}
                color={foregroundColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  styles = StyleSheet.create({
    headerContainer: {
      marginTop: 80
    },
    location: {
      fontSize: 24,
      maxWidth: 280
    },
    home: {
      padding: 10,
      right: -10
    },
    menu: {
      padding: 10,
      left: -10
    }
  });
}
