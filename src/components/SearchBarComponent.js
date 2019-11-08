import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default class SearchBarComponent extends Component {
  state = {
    inputValue: ""
  };

  update = inputValue => {
    this.setState({ inputValue }, () => console.log(this.state.inputValue));
  };

  clear = () => {
    this.setState({ inputValue: "" });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <View style={this.styles.container}>
        <TextInput
          style={this.styles.input}
          placeholder="Type Here..."
          onChangeText={this.update}
          value={inputValue}
        ></TextInput>
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      position: "absolute",
      marginTop: 50
    },
    input: {
      color: "#222",
      height: 50,
      elevation: 5,
      backgroundColor: "#fff",
      paddingLeft: 10,
      width: "94%"
    }
  });
}
