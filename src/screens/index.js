import React from "react";
import { Image } from "react-native";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { TAB_LUNCH, TAB_INTERNET } from "../constants/images";
import HomeScreen from "./HomeScreen";
import InternetScreen from "./InternetScreen";
import DetailScreen from "./DetailScreen";

export const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Detail: {
      screen: DetailScreen
    }
  },
  {
    initialRouteName: "Home"
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  return {
    tabBarVisible,
    tabBarLabel: "lunch",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={TAB_LUNCH}
        style={{ width: 25, height: 25, tintColor }}
        resizeMode="contain"
        tintColor={tintColor}
      />
    )
  };
};

export const InternetStack = createStackNavigator(
  {
    Internet: {
      screen: InternetScreen
    }
  },
  {
    initialRouteName: "Internet"
  }
);

InternetStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  return {
    tabBarVisible,
    tabBarLabel: "internets",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={TAB_INTERNET}
        style={{ width: 25, height: 25, tintColor }}
        resizeMode="contain"
        tintColor={tintColor}
      />
    )
  };
};

export const Tabs = createBottomTabNavigator(
  {
    HomeStack: {
      screen: HomeStack
    },
    InternetStack: {
      screen: InternetStack
    }
  },
  {
    initialRouteName: "HomeStack",
    animationEnabled: true,
    tabBarOptions: {
      style: {
        backgroundColor: "#2a2a2a"
      },
      activeTintColor: "#FFFFFF",
      inactiveTintColor: "#979797",
      labelStyle: {
        fontSize: 10,

        fontFamily: "AvenirNextLTPro-Regular"
      }
    }
  }
);

export default createAppContainer(Tabs);
