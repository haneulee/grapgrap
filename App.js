import React from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./redux/configureStore";
import AppContainer from "./components/AppContainer";
const { persistor, store } = configureStore();

class App extends React.Component {
  state = {
    isLoadingComplete: false
  };
  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadAssetAsync}
          onFinish={this._handleFinishLoading}
          onError={this._handleLoadingError}
        />
      );
    }
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
  _loadAssetAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/instagram.png"),
        require("./assets/images/icon.png"),
        require("./assets/images/splash.png")
      ]),
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialIcons.font
      })
    ]);
  };
  _handleFinishLoading = () => {
    this.setState({
      isLoadingComplete: true
    });
  };
  _handleLoadingError = error => {
    console.error(error);
  };
}

export default App;
