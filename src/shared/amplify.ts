import Amplify, { Hub } from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { API, graphqlOperation } from '@aws-amplify/api';
import Config from '../Config';

// Amplify.Logger.LOG_LEVEL = 'VERBOSE';
// (window as any).LOG_LEVEL = 'DEBUG'

//graphql config required in the amplify.config root as explained in the docs
Amplify.configure({
  ...Config.Amplify,
  // Auth: Config.Amplify.Auth,
  // Storage: Config.Amplify.Storage,
  aws_appsync_graphqlEndpoint: Config.Amplify.AppSync.endpoint,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_appsync_region: 'us-east-1',
})

Auth.configure(Config.Amplify.Auth)
Storage.configure(Config.Amplify.Storage)

API.configure({
  endpoints: [
    {
      name: "remotejobs-api",
      endpoint: "https://pwoxb07r8h.execute-api.us-east-1.amazonaws.com/prod/",
      custom_header: async () => {
        return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
      }
    },
  ]
})

export { Amplify, Auth, API, Hub, graphqlOperation, Storage };
