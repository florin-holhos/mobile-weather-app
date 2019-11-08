import React from "react";
import { StyleSheet, View } from "react-native";
import SearchBarComponent from "./src/components/SearchBarComponent";

export default function App() {
  return (
    <View style={styles.container}>
      <SearchBarComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
