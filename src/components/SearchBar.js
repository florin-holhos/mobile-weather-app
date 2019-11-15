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
import { LocationContext } from "../components/LocationContext";
import uuid4 from "uuid4";

export default class SearchBar extends Component {
  static contextType = LocationContext;
  constructor() {
    super();
    this.state = {
      inputValue: "",
      suggestions: null,
      error: false
    };
    this.timeout = null;
  }

  // need a debounce to fetch results after 500ms
  update = inputValue => {
    this.setState({ inputValue, error: false });
    clearTimeout(this.timeout);
    if (!inputValue) return this.setState({ suggestions: null });
    this.timeout = setTimeout(() => this.fetch(inputValue), 500);
  };

  clear = () => {
    this.setState({ inputValue: "" });
  };

  handleSearch = item => {
    if (!item) return;
    // clear the suggestions list when user selects one
    this.setState({ inputValue: item.name, suggestions: null });

    // check if location is valid
    const valid = item.lat !== "-9999.000000" && item.lon !== "-9999.000000";
    if (!valid) {
      const error = true;
      return this.setState({ error, suggestions: null });
    }

    // get the navigation from props
    const navigation = this.props.navigation;

    // check if location already exists
    if (this.context.locations) {
      const loc = this.context.locations.find(loc => loc.name === item.name);
      if (loc) {
        return navigation.push("Details", { location: item });
      }
    }
    // add an id to this location if it's new
    item.id = uuid4();
    navigation.push("Details", { location: item });
    this.context.updateLocations(item);
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
    const { inputValue, suggestions, error } = this.state;
    return (
      <View style={this.styles.container}>
        <View style={this.styles.search}>
          <Ionicons name="md-search" size={22} color="#ccc" />
          <TextInput
            style={[
              this.styles.input,
              {
                color: error ? "red" : "#222",
                textDecorationLine: error ? "line-through" : "none"
              }
            ]}
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
                onPress={() => this.handleSearch(item)}
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
      marginTop: -52
    },
    search: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 2
    },
    input: {
      flexGrow: 0.99,
      height: 50,
      paddingLeft: 10,
      fontSize: 16
    },
    autocompleteList: {
      position: "absolute",
      backgroundColor: "#fff",
      marginTop: 50,
      width: "100%",
      maxHeight: 300,
      borderTopWidth: 2,
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
      elevation: Platform.OS === "android" ? 3 : 0,
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
