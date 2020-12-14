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
  appName: 'Starter',
  appUrl: process.env.REACT_APP_AppUrl || 'http://localhost:3000/',
  environment: process.env.NODE_ENV || 'development',
  Amplify: {
    API: {},
    Storage: {
      AWSS3: {
        bucket: 'dev-readthenews-processed-email',
        // identityPoolId: process.env.REACT_APP_AmplifyAuthIdenitityPoolId || 'us-east-1:26f56b06-e185-4da4-892c-75af871d7134',
        region: process.env.REACT_APP_AmplifyAuthRegion || 'us-east-1'
      }
    },
    AppSync: {
      endpoint: 'https://hep3su3ozfdtvalamorf6j7qnq.appsync-api.us-east-1.amazonaws.com/graphql',
      ws: 'wss://hep3su3ozfdtvalamorf6j7qnq.appsync-api.us-east-1.amazonaws.com/graphql'
    },
    Auth: {
      region: process.env.REACT_APP_AmplifyAuthRegion || 'us-east-1',
      userPoolWebClientId: process.env.REACT_APP_AmplifyAuthUserPoolWebClientId || '5nqh1btgt5frfbl9j6tiugj35d',
      userPoolId: process.env.REACT_APP_AmplifyAuthUserPoolId || 'us-east-1_hRPaZKP9Q',
      identityPoolId: process.env.REACT_APP_AmplifyAuthIdenitityPoolId || 'us-east-1:26f56b06-e185-4da4-892c-75af871d7134',
      oauth: {
        domain: process.env.REACT_APP_AmplifyOauthDomain || 'dev-readthenews.auth.us-east-1.amazoncognito.com',
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
