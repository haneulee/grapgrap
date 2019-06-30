import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import HomeRoute from "../routes/HomeRoute";
import SearchRoute from "../routes/SearchRoute";
import NotificationsRoute from "../routes/NotificationsRoute";
import ProfileRoute from "../routes/ProfileRoute";
import { AntDesign, Ionicons, Feather, Foundation } from "@expo/vector-icons";

const TabsNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: HomeRoute,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Foundation
            name={"home"}
            size={25}
            color={focused ? "black" : "lightgrey"}
          />
        )
      }
    },
    Search: {
      screen: SearchRoute,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Feather
            name={"search"}
            size={25}
            color={focused ? "black" : "lightgrey"}
          />
        )
      }
    },
    AddPhoto: {
      screen: View,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Feather
            name={"camera"}
            size={25}
            color={focused ? "black" : "lightgrey"}
          />
        )
      }
    },
    Notifications: {
      screen: NotificationsRoute,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <AntDesign
            name={"heart"}
            size={25}
            color={focused ? "black" : "lightgrey"}
          />
        )
      }
    },
    Profile: {
      screen: ProfileRoute,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={"md-person"}
            size={25}
            color={focused ? "black" : "lightgrey"}
          />
        )
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        backgroundColor: "#FBFBFB",
        height: 50
      },
      activeTintColor: "BlueGreen",
      inactiveTintColor: "grey",
      showLabel: false
    }
  }
);

export default createAppContainer(TabsNavigation);
