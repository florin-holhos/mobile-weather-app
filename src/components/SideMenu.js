import React, { Component, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LocationContext } from "./LocationContext";
import {
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native-gesture-handler";

export default function SideMenu({ toggleSideMenu }) {
  const { locations } = useContext(LocationContext);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.listWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My Locations</Text>
          <TouchableOpacity onPress={toggleSideMenu} style={styles.closeMenu}>
            <Ionicons name="md-close" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
        {(locations.length && (
          <FlatList
            nestedScrollEnabled={true}
            style={styles.list}
            data={locations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <TouchableOpacity onPress={() => console.log(item)}>
                  <Text style={styles.listItem}>{item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => console.log("delete" + item.name)}
                  style={styles.closeMenu}
                >
                  <Ionicons name="md-close" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          />
        )) || (
          <Text style={styles.alternativeText}>
            You don't have any saved locations!
          </Text>
        )}
      </ScrollView>
      <View style={styles.overlay} onTouchEnd={toggleSideMenu} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 3,
    display: "flex",
    flexDirection: "row"
  },
  overlay: {
    flexGrow: 0.3,
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  listWrapper: {
    flexGrow: 0.7,
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "rgba(0,0,0,0.9)"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#fff"
  },
  list: {
    paddingTop: 30,
    paddingBottom: 50
  },
  listItem: {
    fontSize: 20,
    color: "#fff"
  },
  closeMenu: {
    padding: 15,
    right: -15
  },
  alternativeText: {
    color: "#fff",
    fontSize: 12
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: "#fff"
  }
});
