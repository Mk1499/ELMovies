import React from 'react';
import {
  createAppContainer
} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Image } from 'react-native';
import { Left, Body, Header } from 'native-base';

import Home from '../screens/Home/Home';
import FavMovies from '../screens/FavMovies/FavMovies';
import SearchRes from '../screens/SearchRes/SearchRes';
import Movie from '../screens/Movie/Movie';

import logo from '../../assets/images/logo.png';

import { Icon } from 'native-base';

const HomeStack = createStackNavigator({
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
        backgroundColor: '#010817',
      },
      headerPressColorAndroid: 'gold',
      headerTintColor: 'gold',
      headerTitleStyle: { color: 'gold', fontSize: 30 }
    })
  },
  Movie: {
    screen: Movie,
    navigationOptions: () => ({
      headerTitle: "",
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitleStyle: { color: 'white' }
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
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="home" style={{ color: tintColor, fontSize: 20 }} />
      },
      headerTitle: "Home",
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
}, {
    tabBarOptions: {
      activeTintColor: 'gold',
      labelStyle: {
        fontSize: 12,
      },
      inactiveTintColor: '#eee',
      style: {
        backgroundColor: '#010817',
        borderTopColor: 'gold'
      },
    }
  });



// const screens = createStackNavigator({ main }, { defaultNavigationOptions: { header: null } })

const AppNavigation = createAppContainer(main)
export default AppNavigation;
