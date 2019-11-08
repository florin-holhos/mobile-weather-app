import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  Platform
} from "react-native";

import { searchAutocomplete } from "../services/searchAutocomplete";

export default class SearchBarComponent extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      suggestions: []
    };
    this.timeout = null;
  }

  update = inputValue => {
    this.setState({ inputValue });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.fetch(inputValue), 500);
  };

  clear = () => {
    this.setState({ inputValue: "" });
  };

  press = item => {
    this.setState({ inputValue: item.name, suggestions: null });
    console.log(item);
  };

  // fetch for suggestions
  fetch = async inputValue => {
    console.log("fetch...");
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
        <TextInput
          style={this.styles.input}
          placeholder="Search for location..."
          onChangeText={this.update}
          value={inputValue}
        ></TextInput>
        {suggestions && (
          <FlatList
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
      flex: 1,
      width: "92%",
      marginTop: 50
    },
    input: {
      color: "#222",
      height: 50,
      elevation: 4,
      backgroundColor: "#fff",
      paddingLeft: 20,
      fontSize: 16,
      borderRadius: 5
    },
    autocompleteList: {
      position: "absolute",
      backgroundColor: "#fff",
      marginTop: 47,
      width: "100%",
      maxHeight: 300,
      borderTopWidth: 1,
      borderTopColor: "#eee",
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
      elevation: Platform.OS === "android" ? 4 : 0
    },
    listItem: {
      textAlignVertical: "center",
      paddingLeft: 20,
      fontSize: 16,
      height: 50
    }
  });
}
