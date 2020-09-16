import React from 'react';

import { Auth } from '../../shared/amplify';
import GoogleIcon from '../../images/google-g-icon.png';

interface Props {}

const Login: React.FC<Props> = () => {
  return (
    <>
    <h1>Login!!</h1>
    <button
    onClick={() => Auth.federatedSignIn({ provider: 'Google' } as any)}
     type="button"
     className="">
       <img src={GoogleIcon} className="storage-icon mr-2" alt="view in drive" /> Log in with Google</button>
    </>
  );
};
export default Login;
