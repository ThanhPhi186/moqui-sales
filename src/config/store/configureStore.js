import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
// import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './rootReducer';
import sagas from './rootSagas';
import AsyncStorage from '@react-native-community/async-storage';
import {ServiceHandle} from '../../services';

const config = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 0,
  blacklist: [],
  debug: true,
};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

// const checkCookiesExpirationMiddleware = store => next => action => {
//   const stateData = store.getState();
//   if (action.type === AuthenOverallRedux.Actions.LOGIN_SUCCESS) {
//     setHeader(action.payload.access_token);
//   }
// };

middleware.push(
  sagaMiddleware,
  // checkCookiesExpirationMiddleware
);

if (__DEV__) {
  // middleware.push(createLogger());
}
const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];

const persistConfig = {enhancers};

const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
  const stateData = store.getState();

  // if (stateData.AuthenOverallReducer.domain) {
  //   ServiceHandle.setBaseUrl(stateData.AuthenOverallReducer.domain);
  // }

  if (stateData.AuthenOverallReducer.cookies) {
    ServiceHandle.setHeader(stateData.AuthenOverallReducer.cookies);
  }
});

const configureStore = () => {
  return {persistor, store};
};
sagaMiddleware.run(sagas);
export default configureStore;
