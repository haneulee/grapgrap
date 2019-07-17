//imports
import { API_URL } from "../../constants";
import { actionCreators as userActions } from "./user";

//actions

const SET_FEED = "SET_FEED";
const SET_SEARCH = "SET_SEARCH";

//action creators

function setFeed(feed) {
  return {
    type: SET_FEED,
    feed
  };
}

function setSearch(feed) {
  return {
    type: SET_SEARCH,
    feed
  };
}

//api actions

function getFeed() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`${API_URL}/images/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logout());
        } else {
          return response.json();
        }
      })
      .then(json => dispatch(setFeed(json)))
      .catch(err => console.log(err));
  };
}

function getSearch() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`${API_URL}/images/search/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logout());
        } else {
          return response.json();
        }
      })
      .then(json => dispatch(setSearch(json)))
      .catch(err => console.log(err));
  };
}

function searchByHashtag(hashtag) {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch(`${API_URL}/images/search/?hashtags=${hashtag}`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logout());
        } else {
          return response.json();
        }
      })
      .then(json => dispatch(setSearch(json)));
  };
}

//initial state

const initialState = {};

//reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FEED:
      return applySetFeed(state, action);
    case SET_SEARCH:
      return applySetSearch(state, action);
    default:
      return state;
  }
}

//reducer functions

function applySetFeed(state, action) {
  const { feed } = action;
  return {
    ...state,
    feed
  };
}

function applySetSearch(state, action) {
  const { search } = action;
  return {
    ...state,
    search
  };
}

//exports

const actionCreators = {
  getFeed,
  getSearch,
  searchByHashtag
};

export { actionCreators };
//default reducer export

export default reducer;
