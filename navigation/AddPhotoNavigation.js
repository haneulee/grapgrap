import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
import CameraScreen from "../screens/CameraScreen";
import LibraryScreen from "../screens/LibraryScreen";
import PhotoRoute from "../routes/PhotoRoute";
import LibraryRoute from "../routes/LibraryRoute";

const AddPhotoNavigation = createMaterialTopTabNavigator(
  //   {
  //     Camera: {
  //       screen: CameraScreen,
  //       navigationOptions: {
  //         tabBarLabel: "Photo"
  //       }
  //     },
  //     Library: {
  //       screen: LibraryScreen,
  //       navigationOptions: {
  //         tabBarLabel: "Library"
  //       }
  //     }
  //   },
  //   {
  //     tabBarPosition: "top",
  //     swipeEnabled: true,
  //     animationEnabled: true,
  //     tabBarOptions: {
  //       showLabel: true,
  //       upperCaseLabel: true,
  //       activeTintColor: "black",
  //       inactiveTintColor: "#bbb",
  //       style: {
  //         backgroundColor: "white",
  //         alignItems: "center"
  //       },
  //       labelStyle: {
  //         fontSize: 14,
  //         fontWeight: "600"
  //       },
  //       showIcon: false
  //     }
  //   }
  {
    Camera: {
      screen: PhotoRoute
    },
    Library: {
      screen: LibraryRoute
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#FBFBFB",
        color: "#000000",
        height: 50
      },
      activeTintColor: "blue",
      inactiveTintColor: "grey"
    }
  }
);

export default createAppContainer(AddPhotoNavigation);
