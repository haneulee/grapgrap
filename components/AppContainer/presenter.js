import React from "react";
import PropTypes from "prop-types";
import { View, Text, StatusBar, StyleSheet, Button } from "react-native";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation";

class AppContainer extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
  };

  render() {
    const { isLoggedIn, logout } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} />
        {isLoggedIn ? (
          <View>
            <Text>you are logged in</Text>
            <Button onPress={logout} title="you are logged in" />
          </View>
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
    // alignItems: "center", //navigation 상위 view에 해당 스타일이 있으면 보여지지 않음
    // justifyContent: "center"
  }
});

export default AppContainer;
