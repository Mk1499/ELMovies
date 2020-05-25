import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions,StatusBar } from "react-native";
import AppNavigation from "./src/routes/navigator";
import NavigationService from "./src/routes/NavigationServices";
import {mainColor,textColor} from './src/configs/global'; 
import { Provider } from "react-redux";
import store from "./src/store";

const { width: Width, height: Hight } = Dimensions.get("window");

export default class App extends Component {
  constructor() {
    super();
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Provider store={store}>
          <StatusBar backgroundColor={mainColor} />
        <AppNavigation
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
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
