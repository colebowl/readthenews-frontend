import React from 'react';
import { Grommet } from 'grommet';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import useAmplifyAuth from './hooks/auth/useAmplifyAuth';
import AuthenticatedRoute from './components/auth/AuthenticatedRoute';
import Dashboard from './components/dashboard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import HomePage from './components/home/HomePage';
import NewJobPosting from './components/jobs/new';

import { RootState } from './store';
import theme from './theme';
import client from './shared/apollo';

const App = () => {
  const { initilized } = useAmplifyAuth();
  const { mode } = useSelector((st: RootState) => st.app);

  return (
    <ApolloProvider client={client}>
      <React.Suspense fallback="loading">
        <Grommet theme={theme} themeMode={mode}>
          {initilized ? (
            <Switch>
              <AuthenticatedRoute path="/jobs/new" exact component={NewJobPosting} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Redirect path="/signout" to="/" />
              <AuthenticatedRoute path="/" component={Dashboard} />
              {/* <Route path="/" exact component={HomePage} /> */}
            </Switch>
          ) : (<h1>LOADING</h1>)}
        </Grommet>
      </React.Suspense>
    </ApolloProvider>
  );
}

export default App;
