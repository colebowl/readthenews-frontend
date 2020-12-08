// src/store/index.ts
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';


import appReducer from './app/reducers'
import authReducer from './auth/reducers'

const history = createBrowserHistory();

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>


const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return {
    store,
    history
  }
}

export default configureStore();
