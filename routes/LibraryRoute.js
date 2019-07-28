import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LibraryScreen from "../screens/LibraryScreen";

const LibraryRoute = createStackNavigator({
  Library: {
    screen: LibraryScreen,
    navigationOptions: {
      header: null
    }
  }
});

export default createAppContainer(LibraryRoute);
