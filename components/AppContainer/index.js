import AppContainer from "./presenter";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  return {
    isLoggedIn: user.isLoggedIn,
    profile: user.profile
  };
};

export default connect(mapStateToProps)(AppContainer);
