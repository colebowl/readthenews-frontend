import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { AUTH_TYPE, createAuthLink, AuthOptions } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { Auth } from './amplify';

import Config from '../Config'

const url = Config.Amplify.AppSync.endpoint;
const { region } = Config.Amplify.Auth;

const auth: AuthOptions = {
  type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
  jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
};

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth })
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});


export default client;
