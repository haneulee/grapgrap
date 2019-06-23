import { combineReducers, applyMiddleware, createStore } from "redux";
import {
  persistStore,
  persistReducer,
  persistCombineReducers
} from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import user from "./modules/user";

const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage
};

const reducer = persistCombineReducers(persistConfig, { user });

const configureStore = () => {
  const store = createStore(reducer, applyMiddleware(...middleware));
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
