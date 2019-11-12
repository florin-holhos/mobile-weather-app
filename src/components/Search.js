import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { searchAutocomplete } from "../services/searchAutocomplete";

export default class SearchBarComponent extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      suggestions: null
    };
    this.timeout = null;
  }

  update = inputValue => {
    this.setState({ inputValue });
    clearTimeout(this.timeout);
    if (!inputValue) return this.setState({ suggestions: null });
    this.timeout = setTimeout(() => this.fetch(inputValue), 500);
  };

  clear = () => {
    this.setState({ inputValue: "" });
  };

  press = item => {
    this.setState({ inputValue: item.name, suggestions: null });
    this.props.handleSearch(item);
  };

  // fetch for suggestions
  fetch = async inputValue => {
    if (!inputValue) return this.setState({ suggestions: null });
    const data = await searchAutocomplete(inputValue);
    return (
      data &&
      data.length > 0 &&
      this.setState({
        suggestions: data.map(location => {
          return {
            name: location.name,
            lat: location.lat,
            lon: location.lon
          };
        })
      })
    );
  };

  render() {
    const { inputValue, suggestions } = this.state;
    return (
      <View style={this.styles.container}>
        <View style={this.styles.search}>
          <Ionicons name="md-search" size={22} color="#ccc" />
          <TextInput
            style={this.styles.input}
            placeholder="Search for location..."
            onChangeText={this.update}
            value={inputValue}
          />
        </View>
        {suggestions && (
          <FlatList
            nestedScrollEnabled={true}
            style={this.styles.autocompleteList}
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text
                style={this.styles.listItem}
                onPress={() => this.press(item)}
              >
                {item.name}
              </Text>
            )}
          />
        )}
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {
      width: "100%",
      marginTop: 30
    },
    search: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 5,
      elevation: 4,
      paddingLeft: 10
    },
    input: {
      flexGrow: 0.99,
      color: "#222",
      height: 50,
      paddingLeft: 10,
      fontSize: 16
    },
    autocompleteList: {
      position: "absolute",
      backgroundColor: "#fff",
      marginTop: 46,
      width: "100%",
      maxHeight: 300,
      borderTopWidth: 1,
      borderTopColor: "#eee",
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
      elevation: Platform.OS === "android" ? 4 : 0,
      zIndex: 1
    },
    listItem: {
      textAlignVertical: "center",
      paddingLeft: 36,
      fontSize: 16,
      height: 50
    }
  });
}
