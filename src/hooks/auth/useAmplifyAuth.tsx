import React from 'react';
import { useDispatch } from 'react-redux';
import { CognitoUser } from '@aws-amplify/auth';
import { Hub, Auth } from '../../shared/amplify';
import Config from 'Config';

const useAmplifyAuth = () => {
  const dispatch = useDispatch();
  const [initilized, setInitilized] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleUserLogin = async (auth: CognitoUser) => {
    const user = await new Promise((resolve, reject) => {
      auth.getUserAttributes((err, res) => {
        if (err || !res) {
          reject(err);
          return;
        }

        const userProfile = res.reduce<{ [key: string]: any }>((usr, attr) => {
          const nextUsr = usr;
          if (attr.getName() === 'sub') {
            nextUsr.id = `USER#${attr.getValue()}`;
          } else {
            nextUsr[attr.getName()] = attr.getValue();
          }
          return nextUsr;
        }, {})
        resolve(userProfile);
      })
    });

    dispatch({
      type: 'auth.authenticatedUser.set',
      payload: user,
    });

    setInitilized(true);
  }

  React.useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      console.log('{ event, data }:', { event, data })
      switch (event) {
        case 'signIn':
          handleUserLogin(data);
          setIsAuthenticated(true);
          break;
        case 'signOut':
          setIsAuthenticated(false);
          break;
        case 'customOAuthState':
          console.log('customOAuthState:', data);
          break;
        default:
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(async user => {
        if (user) {
          console.log('user:', user)
          //Get the current session from aws amplify
          const session = await Auth.currentSession();
          console.log('session:', session)
          if (chrome) {
            chrome.runtime.sendMessage(
              Config.extensions.chrome.id,
              { session },
              (response: any) => console.log('got a response', response)
            );
          }

          handleUserLogin(user);
        }
      }).catch(error => {
        console.log('currentAuthenticatedUsererror:', error);

        if (chrome) {
          chrome.runtime.sendMessage(
            Config.extensions.chrome.id,
            {}
          );
        }
        setInitilized(true);
      })
    // eslint-disable-next-line
  }, []);

  return { initilized, isAuthenticated }
}
export default useAmplifyAuth;
