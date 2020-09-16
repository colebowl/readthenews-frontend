interface Config {
  appName: string;
  appUrl: string;
  environment: 'production' | 'test' | 'development'
  Amplify: {
    API: { [key: string]: any },
    Auth: { [key: string]: any }
  }
}

export const Config: Config = {
  appName: 'App Name',
  appUrl: process.env.REACT_APP_AppUrl || 'http://localhost:3000/',
  environment: process.env.NODE_ENV || 'development',
  Amplify: {
    API: {},
    Auth: {
      region: process.env.REACT_APP_AmplifyAuthRegion || 'us-east-1',
      userPoolWebClientId: process.env.REACT_APP_AmplifyAuthUserPoolWebClientId || '1riu4t5j1292mmif728nun7i0p',
      userPoolId: process.env.REACT_APP_AmplifyAuthUserPoolId || 'us-east-1_E9PJNm6uj',
      identityPoolId: process.env.REACT_APP_AmplifyAuthIdenitityPoolId
        || 'us-east-1:898dc435-8fe2-4b01-8c75-b7392f1cb827',
      oauth: {
        domain: process.env.REACT_APP_AmplifyOauthDomain || 'remotejobs.auth.us-east-1.amazoncognito.com',
        scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: process.env.REACT_APP_AmplifyOauthRedirectSignInUrl || 'http://localhost:3000',
        redirectSignOut: process.env.REACT_APP_AmplifyOauthRedirectSignOutUrl || 'http://localhost:3000/signout',
        responseType: 'code',
        federationTarget: 'Google',
      }
    }
  }
}

export default Config;
