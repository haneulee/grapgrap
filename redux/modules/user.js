//imports
import { API_URL } from "../../constants";
import { AsyncStorage } from "react-native";

//actions

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_USER = "SET_USER";

//action creators

function login(token) {
  return {
    type: LOGIN,
    token
  };
}

function logout() {
  return {
    type: LOGOUT
  };
}

function setUser(user) {
  return {
    type: SET_USER,
    user
  };
}

//api actions

function usernameLogin(username, password) {
  return dispatch => {
    fetch(`${API_URL}/rest-auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.token) {
          dispatch(login(json.token));
        }
        if (json.user) {
          dispatch(setUser(json.user));
        }
      })
      .catch(err => console.log(err));
  };
}

//initial state

const initialState = {
  isLoggedIn: false
};

//reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return applyLogin(state, action);
    case LOGOUT:
      return applyLogout(state, action);
    case SET_USER:
      return applySetUser(state, action);
    default:
      return state;
  }
}

//reducer functions

function applyLogin(state, action) {
  const { token } = action;
  return {
    ...state,
    isLoggedIn: true,
    token: token
  };
}

function applyLogout(state, action) {
  AsyncStorage.clear();
  return {
    isLoggedIn: false
  };
}

function applySetUser(state, action) {
  const { user } = action;
  return {
    ...state,
    profile: user
  };
}

//exports

const actionCreators = {
  usernameLogin
};

export { actionCreators };
//default reducer export

export default reducer;
