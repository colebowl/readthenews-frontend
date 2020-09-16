import React from 'react';
import { Grommet } from 'grommet';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useAmplifyAuth from './hooks/auth/useAmplifyAuth';
import AuthenticatedRoute from './components/auth/AuthenticatedRoute';
import Dashboard from './components/dashboard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import HomePage from './components/home/HomePage';
import { RootState } from './store';

import theme from './theme';

const App = () => {
  const { initilized } = useAmplifyAuth();
  const { mode } = useSelector((st: RootState) => st.app);

  return (
    <Grommet theme={theme} full themeMode={mode}>
      {initilized ? (
        <Switch>
          <AuthenticatedRoute path="/dashboard" exact component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      ) : (<h1>LOADING</h1>)}
    </Grommet>
  );
}

export default App;
