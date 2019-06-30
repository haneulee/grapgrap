import React, { Component } from "react";
import { Alert } from "react-native";
import PropTypes from "prop-types";
import LogInScreen from "./presenter";

class Container extends Component {
  state = {
    username: "",
    password: "",
    isSubmitting: false
  };
  static propTypes = {
    login: PropTypes.func.isRequired,
    fbLogin: PropTypes.func.isRequired
  };
  render() {
    return (
      <LogInScreen
        {...this.state}
        onChangeUsername={this._onChangeUsername}
        onChangePassword={this._onChangePassword}
        onSubmit={this._onSubmit}
        fbLogin={this._handleFBLogin}
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

  _onSubmit = async event => {
    const { username, password, isSubmitting } = this.state;
    const { login } = this.props;

    if (!isSubmitting) {
      if (username && password) {
        this.setState({
          isSubmitting: true
        });
        const loginResult = await login(username, password);
        if (!loginResult) {
          Alert.alert("something went wrong. check your ID or password.");
          this.setState({ isSubmitting: false });
        } else {
          //   getFeed();
          //   navigation.goBack(null);
        }
      } else {
        Alert.alert("all fields are required.");
      }
    }
  };
  _handleFBLogin = async () => {
    const { fbLogin } = this.props;
    this.setState({ isSubmitting: true });
    const facebookResult = await fbLogin();
    console.log("_handlefblogin", facebookResult);
    if (!facebookResult) {
      this.setState({ isSubmitting: false });
    }
  };
}
export default Container;
