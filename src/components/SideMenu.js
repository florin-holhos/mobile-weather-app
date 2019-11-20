import React, { Component, useContext } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
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
    <View style={[styles.container, { transform: [{ translateX: -100 }] }]}>
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
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => console.log("delete => " + item.name)}
                  style={styles.removeLocation}
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
    width: "20%",
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  listWrapper: {
    width: "80%",
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
  itemText: {
    fontSize: 16,
    color: "#fff",
    paddingTop: 5,
    paddingBottom: 5,
    maxWidth: 230
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
    height: 50,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: "#fff"
  },
  removeLocation: {
    padding: 5,
    right: -5
  }
});
