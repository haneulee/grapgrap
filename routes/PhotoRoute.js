import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import CameraScreen from "../screens/CameraScreen";

const PhotoRoute = createStackNavigator({
  Photo: {
    screen: CameraScreen,
    navigationOptions: {
      header: null
    }
  }
});

export default createAppContainer(PhotoRoute);
