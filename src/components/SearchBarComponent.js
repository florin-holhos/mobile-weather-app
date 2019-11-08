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
    (this.state = {
      inputValue: "",
      suggestions: [
        { name: "Timisoara" },
        { name: "Timimon" },
        { name: "Timimon" },
        { name: "Timimon" },
        { name: "Timimon" },
        { name: "Timimon" },
        { name: "Timimon" },
        { name: "Timimon" },
        { name: "Timimon" },
        { name: "Timimon" },
        { name: "Timimon" },
        { name: "Timimon" },
        { name: "Timisesti, Romania" }
      ]
    }),
      (this.timeout = null);
  }

  update = async inputValue => {
    this.setState({ inputValue }, () => console.log(this.state.inputValue));
    clearTimeout(this.timeout);
    this.timeout = setTimeout(async () => {
      const suggestions = await searchAutocomplete(inputValue);
      console.log(suggestions);
    }, 500);
  };

  clear = () => {
    this.setState({ inputValue: "" });
  };

  press = item => {
    this.update(item.name);
    this.setState({ suggestions: null });
    console.log(item);
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
