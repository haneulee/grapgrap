//imports
import { API_URL, FB_APP_ID } from "../../constants";
import { AsyncStorage } from "react-native";
import * as Facebook from "expo-facebook";

//actions

const LOGIN = "LOG_IN";
const LOGOUT = "LOG_OUT";
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
        if (json.token && json.user) {
          dispatch(login(json.token));
          dispatch(setUser(json.user));
          return true;
        } else {
          return false;
        }
      })
      .catch(err => console.log(err));
  };
}

function facebookLogin() {
  return async dispatch => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      FB_APP_ID,
      {
        permissions: ["public_profile", "email"]
      }
    );

    if (type === "success") {
      return fetch(`${API_URL}/users/login/facebook/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          access_token: token
        })
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          if (json.user && json.token) {
            dispatch(login(json.token));
            dispatch(setUser(json.user));
            return true;
          } else {
            return false;
          }
        });
    }
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
  //  AsyncStorage.clear();
  console.log("logout~~~~~");
  return {
    ...state,
    isLoggedIn: false,
    token: "",
    profile: []
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
  usernameLogin,
  facebookLogin,
  logout
};

export { actionCreators };
//default reducer export

export default reducer;
