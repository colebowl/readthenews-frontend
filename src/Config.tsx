// (window as any).LOG_LEVEL = 'DEBUG';

interface Config {
  appName: string;
  appUrl: string;
  environment: 'production' | 'test' | 'development'
  Amplify: {
    API: { [key: string]: any };
    AppSync: { [key: string]: any };
    Auth: { [key: string]: any };
    Storage: { [key: string]: any };
  },
  extensions: {
    chrome: {
      id: string;
    }
  }
}

const Config: Config = {
  appName: 'thru',
  appUrl: process.env.REACT_APP_AppUrl || 'http://localhost:3000/',
  environment: process.env.NODE_ENV || 'development',
  Amplify: {
    API: {},
    Storage: {
      AWSS3: {
        bucket: process.env.REACT_APP_S3EmailBucket  || 'dev-readthenews-processed-email',
        // identityPoolId: process.env.REACT_APP_AmplifyAuthIdenitityPoolId || 'us-east-1:f116f18a-eb3e-474e-87ac-4d8e0b558954',
        region: process.env.REACT_APP_AmplifyAuthRegion || 'us-east-1'
      }
    },
    AppSync: {
      endpoint: `https://${process.env.REACT_APP_GraphQLEndpoint || 'zlimgx7eozb6pkee273k6emb3e.appsync-api.us-east-1.amazonaws.com/graphql'}`,
      ws: `wss://${process.env.REACT_APP_GraphQLEndpoint || 'zlimgx7eozb6pkee273k6emb3e.appsync-api.us-east-1.amazonaws.com/graphql'}`,
    },
    Auth: {
      region: process.env.REACT_APP_AmplifyAuthRegion || 'us-east-1',
      userPoolWebClientId: process.env.REACT_APP_AmplifyAuthUserPoolWebClientId || '50bgd6onql83jqjmjlq3qfmtnc',
      userPoolId: process.env.REACT_APP_AmplifyAuthUserPoolId || 'us-east-1_dQG6VTtBt',
      identityPoolId: process.env.REACT_APP_AmplifyAuthIdenitityPoolId || 'us-east-1:a5e6ea25-9295-4aa3-8bb1-0900930647fa',
      oauth: {
        domain: process.env.REACT_APP_AmplifyOauthDomain || 'dev-thru.auth.us-east-1.amazoncognito.com',
        scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: process.env.REACT_APP_AmplifyOauthRedirectSignInUrl || 'http://localhost:3000/',
        redirectSignOut: process.env.REACT_APP_AmplifyOauthRedirectSignOutUrl || 'http://localhost:3000/signout',
        responseType: 'code',
        federationTarget: 'Google',
      },
    }
  },
  extensions: {
    chrome: {
      id: process.env.REACT_APP_ExtensionsChromeId || 'ngffffpnaojkieodkhefemdopebggjip',
    }
  }
}

export default Config;
