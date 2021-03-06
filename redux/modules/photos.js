//imports
import { API_URL } from "../../constants";
import { actionCreators as userActions } from "./user";
import uuidv1 from "uuid/v1";

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

function setSearch(search) {
  return {
    type: SET_SEARCH,
    search
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
    const {
      user: { token }
    } = getState();
    fetch(`${API_URL}/images/search/?hashtags=${hashtag}`, {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
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

function likePhoto(id) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`${API_URL}/images/${id}/likes/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (response.ok) {
        return true;
      } else {
        return false;
      }
    });
  };
}

function unlikePhoto(id) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`${API_URL}/images/${id}/unlikes/`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (response.ok) {
        return true;
      } else {
        return false;
      }
    });
  };
}

function uploadPhoto(file, caption, location, tags) {
  const tagsArray = tags.split(",");
  const data = new FormData();
  data.append("caption", caption);
  data.append("location", location);
  data.append("tags", JSON.stringify(tagsArray));
  data.append("file", {
    uri: file,
    type: "image/jpeg",
    name: `${uuidv1()}.jpg`
  });
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    return fetch(`${API_URL}/images/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "multipart/form-data"
      },
      body: data
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (response.ok) {
        dispatch(getFeed());
        dispatch(userActions.getOwnProfile());
        return true;
      } else {
        return false;
      }
    });
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
  searchByHashtag,
  likePhoto,
  unlikePhoto,
  uploadPhoto
};

export { actionCreators };
//default reducer export

export default reducer;
