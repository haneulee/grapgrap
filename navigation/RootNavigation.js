import { createStackNavigator, createAppContainer } from "react-navigation";
import TakePhotoScreen from "../screens/TakePhotoScreen";
import TabsNavigation from "./TabsNavigation";
import UploadPhotoScreen from "../screens/UploadPhotoScreen";
import AddPhotoNavigation from "./AddPhotoNavigation";

const RootNavigation = createStackNavigator(
  {
    Tabs: {
      screen: TabsNavigation,
      navigationOptions: {
        header: null
      }
    },
    TakePhoto: {
      screen: AddPhotoNavigation,
      navigationOptions: {
        header: null
      }
    },
    UploadPhoto: {
      screen: UploadPhotoScreen,
      navigationOptions: {
        title: "Upload Photo"
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
