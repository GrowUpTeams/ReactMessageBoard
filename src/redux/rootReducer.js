import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import messageReducer from './slices/message';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  keyPrefix: 'redux-',
  whitelist: ['settings']
};

const authPersistConfig = {
  key: 'authJwt',
  storage: storage,
  keyPrefix: 'redux-',
  whitelist: ['isAuthenticated']
};

const appReducer = combineReducers({
  message: messageReducer
  // BACKUP: if we had setting version
  //   settings: settingsReducer,
  // BACKUP: if we had login version
  //   authJwt: persistReducer(authPersistConfig, authJwtReducer)
});

// Cleans up the states when logoutSuccess is triggered
const rootReducer = (state, action) => {
  // BACKUP: if we had login version
  //   if (action.type === "authJwt/logoutSuccess") {
  //     storage.removeItem("persist:root");
  //     return appReducer(undefined, action);
  //   }
  return appReducer(state, action);
};

export { rootPersistConfig, rootReducer };
