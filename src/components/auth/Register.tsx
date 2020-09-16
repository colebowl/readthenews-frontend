import React from 'react';

import { Auth } from '../../shared/amplify';
import GoogleIcon from '../../images/google-g-icon.png';

interface Props {}

const Register: React.FC<Props> = (props) => {
  return (
    <>
    <h1>Register!!</h1>
    <button
    onClick={() => Auth.federatedSignIn({ provider: 'Google' } as any)}
     type="button"
     className="">
       <img src={GoogleIcon} className="storage-icon mr-2" alt="view in drive" /> Log in with Google</button>
    </>
  );
};
export default Register;
