import React from "react";
import { createAppContainer } from "react-navigation";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { mainColor, bgColor } from "../configs/global";

import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import Splash from '../screens/Splash/Splash'; 
import Login from "../screens/Login/Login";
import userProfile from "../screens/userProfile/userProfile";
import SignUp from "../screens/Signup/Signup";

import Home from "../screens/Home/Home"; // Movie Home
import FavMovies from "../screens/FavMovies/FavMovies";
import SearchRes from "../screens/SearchRes/SearchRes";
import Movie from "../screens/Movie/Movie";

import TVHome from "../screens/TV/TV";
import Series from "../screens/Series/Series";

import Actors from "../screens/Actors/Actor";
import ActorProfile from "../screens/ActorProfile/ActorProfile";

import { Icon } from "native-base";
const { width } = Dimensions.get("window");

// Stacks

const MovieStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      headerTitle: null,
      header: null
    })
  },
  SearchRes: {
    screen: SearchRes,
    navigationOptions: () => ({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#fff"
      },
      headerPressColorAndroid: main,
      headerTintColor: mainColor,
      headerTransparent: true,
      header: null
    })
  },
  Movie: {
    screen: Movie,
    navigationOptions: () => ({
      headerTitle: "",
      headerTransparent: true,
      headerPressColorAndroid: mainColor,
      headerTintColor: mainColor
    })
  },
  ActorProfile: {
    screen: ActorProfile,
    navigationOptions: () => ({
      headerTitle: "",
      headerTransparent: true,
      headerPressColorAndroid: mainColor,
      headerTintColor: mainColor
    })
  },
  Series: {
    screen: Series,
    navigationOptions: () => ({
      headerTitle: "",
      headerTransparent: true,
      headerPressColorAndroid: mainColor,
      headerTintColor: mainColor
    })
  }
});

const TVStack = createStackNavigator({
  TVHome: {
    screen: TVHome,
    navigationOptions: () => ({
      headerTitle: null,
      header: null
    })
  },
  Series: {
    screen: Series,
    navigationOptions: () => ({
      headerTitle: "",
      headerTransparent: true,
      headerPressColorAndroid: mainColor,
      headerTintColor: mainColor
    })
  },
  SearchSeriesRes: {
    screen: SearchRes,
    navigationOptions: () => ({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#fff"
      },
      headerPressColorAndroid: main,
      headerTintColor: mainColor,
      headerTransparent: true,
      header: null
    })
  },
  ActorProfile: {
    screen: ActorProfile,
    navigationOptions: () => ({
      headerTitle: "",
      headerTransparent: true,
      headerPressColorAndroid: mainColor,
      headerTintColor: mainColor
    })
  },
  Movie: {
    screen: Movie,
    navigationOptions: () => ({
      headerTitle: "",
      headerTransparent: true,
      headerPressColorAndroid: mainColor,
      headerTintColor: mainColor
    })
  }
});

const FavStack = createStackNavigator({
  Favorites: {
    screen: FavMovies,
    navigationOptions: () => ({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#010817"
      }
    })
  },

  Movie: {
    screen: Movie,
    navigationOptions: () => ({
      headerTitle: "",
      headerTransparent: true
    })
  }
});

const ActorStack = createStackNavigator({
  Actors: {
    screen: Actors,
    navigationOptions: () => ({
      header: null
    })
  },

  Movie: {
    screen: Movie,
    navigationOptions: () => ({
      headerTitle: "",
      headerTransparent: true,
      headerPressColorAndroid: mainColor,
      headerTintColor: mainColor
    })
  },
  ActorProfile: {
    screen: ActorProfile,
    navigationOptions: () => ({
      headerTitle: "",
      headerTransparent: true,
      headerPressColorAndroid: mainColor,
      headerTintColor: mainColor
    })
  },
  Series: {
    screen: Series,
    navigationOptions: () => ({
      headerTitle: "",
      headerTransparent: true,
      headerPressColorAndroid: mainColor,
      headerTintColor: mainColor
    })
  }
});

const UserStack = createStackNavigator({
  Profile: {
    screen: userProfile,
    navigationOptions: () => ({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#010817"
      }
    })
  },

  Movie: {
    screen: Movie,
    navigationOptions: () => ({
      headerTitle: "",
      headerTransparent: true
    })
  }
});
const mainBtm = createBottomTabNavigator(
  {
    Movies: {
      screen: MovieStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return (
            <Icon name="play" style={{ color: tintColor, fontSize: 20 }} />
          );
        },
        headerTitle: "Movies"
      }
    },
    TV: {
      screen: TVStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <Icon name="tv" style={{ color: tintColor, fontSize: 20 }} />;
        },
        headerTitle: "Movies"
      }
    },
    Actors: {
      screen: ActorStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return (
            <Icon name="person" style={{ color: tintColor, fontSize: 20 }} />
          );
        }
      }
    },
    Profile: {
      screen: userProfile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return (
            <Icon
              name="profile"
              type="AntDesign"
              style={{ color: tintColor, fontSize: 20 }}
            />
          );
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: mainColor,
      labelStyle: {
        fontSize: 12
      },
      inactiveTintColor: "grey",
      style: {
        borderTopWidth: 2,
        backgroundColor: bgColor,
        borderTopColor: mainColor,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 52
        },
        shadowOpacity: 0.8,
        shadowRadius: 15.19,
        elevation: 23
      }
    }
  }
);

const main = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: mainBtm,
    navigationOptions: {
      header: null
    }
  }
});

// const screens = createStackNavigator({ main }, { defaultNavigationOptions: { header: null } })

const AppNavigation = createAppContainer(main);
export default AppNavigation;
