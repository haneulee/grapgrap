import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "../../components/Profile";

class Container extends Component {
  static navigationOptions = ({ navigation }) => {
    const { username } = navigation.getScreenProps();
    console.log(username);
    return {
      headerTitle: username
    };
  };
  static propTypes = {
    profile: PropTypes.object.isRequired,
    getOwnProfile: PropTypes.func.isRequired
  };
  render() {
    const { profile, getOwnProfile } = this.props;
    return <Profile profileObject={profile} refresh={getOwnProfile} />;
  }
}

export default Container;
