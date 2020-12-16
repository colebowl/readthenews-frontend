import React from 'react';
import { Grommet } from 'grommet';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { ToastProvider } from 'react-toast-notifications';


import useAmplifyAuth from './hooks/auth/useAmplifyAuth';
import AuthenticatedRoute from './components/auth/AuthenticatedRoute';
import Dashboard from './components/dashboard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Welcome from './components/welcome';

import { RootState } from './store';
import theme from './theme';
import client from './shared/apollo';

import ToastMessage from './components/shared/ToastMessage'

const App = () => {
  const { initilized } = useAmplifyAuth();
  const { mode } = useSelector((st: RootState) => st.app);
  return (
    <ApolloProvider client={client}>
      <React.Suspense fallback="loading">
        <Grommet theme={theme} themeMode={mode} full>
          <ToastProvider components={{ Toast: ToastMessage }} autoDismiss autoDismissTimeout={10000}>
            {initilized ? (
              <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Redirect path="/signout" to="/" />
                <Redirect path="/" exact to="/today" />
                <AuthenticatedRoute path="/welcome" component={Welcome} />
                <AuthenticatedRoute path="*" component={Dashboard} />
              </Switch>
            ) : (<h1>LOADING</h1>)}
          </ToastProvider>
        </Grommet>
      </React.Suspense>
    </ApolloProvider>
  );
}

export default App;
