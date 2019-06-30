import { createStackNavigator, createAppContainer } from "react-navigation";
import TakePhotoScreen from "../screens/TakePhotoScreen";
import TabsNavigation from "./TabsNavigation";

const RootNavigation = createStackNavigator(
  {
    Tabs: {
      screen: TabsNavigation,
      navigationOptions: {
        header: null
      }
    },
    TakePhoto: {
      screen: TakePhotoScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    mode: "modal",
    defaultNavigationOptions: {
      gesturesEnabled: true
    }
  }
);

export default createAppContainer(RootNavigation);
