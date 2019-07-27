import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Profile from "./presenter";
import ActionSheet from "react-native-actionsheet";

const options = ["Cancel", "Log Out"];
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

class Container extends Component {
  static propTypes = {
    profileObject: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };
  state = {
    isFetching: true,
    mode: "grid"
  };
  componentDidMount = () => {
    const { profileObject } = this.props;
    if (profileObject) {
      this.setState({
        isFetching: false
      });
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.profileObject) {
      this.setState({
        isFetching: false
      });
    }
  };

  render() {
    const { isFetching } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Profile
          {...this.props}
          {...this.state}
          changeToList={this._changeToList}
          changeToGrid={this._changeToGrid}
          showAS={this._showActionSheet}
        />
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this._handleSheetPress}
        />
      </View>
    );
  }
  _changeToList = () => {
    this.setState({
      mode: "list"
    });
  };
  _changeToGrid = () => {
    this.setState({ mode: "grid" });
  };
  _showActionSheet = () => {
    const {
      profileObject: { is_self }
    } = this.props;
    // if (is_self) {
    this.ActionSheet.show();
    // }
  };
  _handleSheetPress = index => {
    const { logout } = this.props;
    console.log("====", index);
    if (index === 1) {
      logout();
    }
  };
}

export default Container;
