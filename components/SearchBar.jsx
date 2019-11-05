import React, { Component } from "react";
import { SearchBar } from "react-native-elements";

export default class SearchBar extends Component {
  state = {
    search: ""
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={this.state.search}
      />
    );
  }
}
