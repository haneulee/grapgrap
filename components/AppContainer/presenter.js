import React from "react";
import PropTypes from "prop-types";
import { View, Text, StatusBar, StyleSheet, Button } from "react-native";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation";
import RootNavigation from "../../navigation/RootNavigation";

class AppContainer extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired,
    initApp: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { isLoggedIn, initApp } = this.props;
    if (isLoggedIn) {
      initApp();
    }
  }

  render() {
    const { isLoggedIn, logout, profile } = this.props;
    console.log("render === ", profile);
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} />
        {isLoggedIn ? (
          <RootNavigation screenProps={{ username: profile.username }} />
        ) : (
          <LoggedOutNavigation />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default AppContainer;
