import React, { Component } from "react";
import { Alert } from "react-native";
import LogInScreen from "./presenter";

class Container extends Component {
  state = {
    username: "",
    password: "",
    isSubmitting: false
  };
  render() {
    return (
      <LogInScreen
        {...this.state}
        onChangeUsername={this._onChangeUsername}
        onChangePassword={this._onChangePassword}
        onSubmit={this._onSubmit}
      />
    );
  }
  _onChangeUsername = text => {
    this.setState({
      username: text
    });
  };

  _onChangePassword = text => {
    this.setState({
      password: text
    });
  };

  _onSubmit = event => {
    const { username, password, isSubmitting } = this.state;

    if (!isSubmitting) {
      if (username && password) {
        this.setState({
          isSubmitting: true
        });
        this.props.login(username, password);
      } else {
        Alert.alert("all fields are required.");
      }
    }
  };
}
export default Container;
