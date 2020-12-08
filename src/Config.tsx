// (window as any).LOG_LEVEL = 'DEBUG';

interface Config {
  appName: string;
  appUrl: string;
  environment: 'production' | 'test' | 'development'
  Amplify: {
    API: { [key: string]: any },
    AppSync: { [key: string]: any },
    Auth: { [key: string]: any }
  }
}

const Config: Config = {
  appName: 'Starter',
  appUrl: process.env.REACT_APP_AppUrl || 'http://localhost:3000/',
  environment: process.env.NODE_ENV || 'development',
  Amplify: {
    API: {},
    AppSync: {
      endpoint: 'https://hep3su3ozfdtvalamorf6j7qnq.appsync-api.us-east-1.amazonaws.com/graphql',
    },
    Auth: {
      region: process.env.REACT_APP_AmplifyAuthRegion || 'us-east-1',
      userPoolWebClientId: process.env.REACT_APP_AmplifyAuthUserPoolWebClientId || '3gf0fk2h8eftbvg20o6ut1577k',
      userPoolId: process.env.REACT_APP_AmplifyAuthUserPoolId || 'us-east-1_l1ZY862Aj',
      identityPoolId: process.env.REACT_APP_AmplifyAuthIdenitityPoolId || 'us-east-1:c7dbb67d-9b78-47f4-a2fa-2430b4ce86d6',
      oauth: {
        domain: process.env.REACT_APP_AmplifyOauthDomain || 'dev-readthenews.auth.us-east-1.amazoncognito.com',
        scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: process.env.REACT_APP_AmplifyOauthRedirectSignInUrl || 'http://localhost:3000/',
        redirectSignOut: process.env.REACT_APP_AmplifyOauthRedirectSignOutUrl || 'http://localhost:3000/signout',
        responseType: 'code',
        federationTarget: 'Google',
      }
    }
  }
}

export default Config;
