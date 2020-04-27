import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import AppNavigation from "./src/routes/navigator";

import { Provider } from "react-redux";
import store from "./src/store";

const { width: Width, height: Hight } = Dimensions.get("window");

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#010817"
  },
  header: {
    backgroundColor: "#010911"
  }
});
