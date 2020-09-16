import Amplify, { Hub } from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import API from '@aws-amplify/api';
import { Config } from '../Config';

// Amplify.Logger.LOG_LEVEL = 'VERBOSE';
// (window as any).LOG_LEVEL = 'DEBUG'

Amplify.configure(Config.Amplify)
Auth.configure(Config.Amplify.Auth)

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

export { Amplify, Auth, API, Hub };
