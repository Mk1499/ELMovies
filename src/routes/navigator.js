import React from 'react';
import {
  createAppContainer
} from 'react-navigation';
import {Dimensions} from 'react-native'; 
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import {mainColor} from '../configs/global'; 

import Home from '../screens/Home/Home'; // Movie Home
import FavMovies from '../screens/FavMovies/FavMovies';
import SearchRes from '../screens/SearchRes/SearchRes';
import Movie from '../screens/Movie/Movie';

import TVHome from '../screens/TV/TV'; 
import Series from '../screens/Series/Series'; 

import logo from '../../assets/images/logo.png';

import { Icon } from 'native-base';
const {width} = Dimensions.get("window"); 


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
        backgroundColor: '#fff',
      },
      headerPressColorAndroid: main,
      headerTintColor: mainColor,
      headerTransparent: true,
    })
  },
  Movie: {
    screen: Movie,
    navigationOptions: () => ({
      headerTitle: "",
      headerTransparent: true,
      headerPressColorAndroid: mainColor,
      headerTintColor: mainColor,
    })
  }
})

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
      headerTintColor: mainColor,
    })
  }
 
})

const FavStack = createStackNavigator({
  Favorites: {
    screen: FavMovies,
    navigationOptions: () => ({
      headerTitle: "",
      headerStyle: {
        backgroundColor: '#010817'
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
})



const main = createBottomTabNavigator({
  Movies: {
    screen: MovieStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="play" style={{ color: tintColor, fontSize: 20 }} />
      },
      headerTitle: "Movies",
    }
  },
  TV: {
    screen: TVStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="tv" style={{ color: tintColor, fontSize: 20 }} />
      },
      headerTitle: "Movies",
    }
  },
  Favorites: {
    screen: FavStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="heart" style={{ color: tintColor, fontSize: 20 }} />
      }
    }
  },
  Me: {
    screen: FavStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="person" style={{ color: tintColor, fontSize: 20 }} />
      }
    }
  },
}, {
    tabBarOptions: {
      activeTintColor: mainColor,
      labelStyle: {
        fontSize: 12,
      },
      inactiveTintColor: 'grey',
      style: {
        borderTopWidth:2,
        backgroundColor: '#fff',
        borderTopColor: mainColor,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 52
        },
        shadowOpacity: 0.8,
        shadowRadius: 15.19,
        elevation: 23
      },
    }
  });



// const screens = createStackNavigator({ main }, { defaultNavigationOptions: { header: null } })

const AppNavigation = createAppContainer(main)
export default AppNavigation;
