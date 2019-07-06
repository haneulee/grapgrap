import AppContainer from "./presenter";
import { connect } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as photoActions } from "../../redux/modules/photos";

const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  console.log(user);
  return {
    isLoggedIn: user.isLoggedIn,
    profile: user.profile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      return dispatch(userActions.logout());
    },
    initApp: () => {
      dispatch(photoActions.getFeed());
      dispatch(photoActions.getSearch());
      dispatch(userActions.getNotifications());
      dispatch(userActions.getOwnProfile());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
