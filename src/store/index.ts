// src/store/index.ts
import { combineReducers, createStore } from 'redux';
import { createBrowserHistory } from 'history';


import appReducer from './app/reducers'
import authReducer from './auth/reducers'

const history = createBrowserHistory();

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>


const configureStore = () => {
  const store = createStore(rootReducer);
  return {
    store,
    history
  }
}

export default configureStore();
