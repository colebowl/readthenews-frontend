import { Box, ResponsiveContext } from 'grommet';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import React from 'react';

import { Auth } from '../../shared/amplify';
import GoogleIcon from '../../images/google-g-icon.png';
import PageWrapper from '../layout/PageWrapper';
import Tile from '../layout/Tile';
import Button from '../shared/ui/Button';
import Heading from '../shared/ui/Heading';

import Config from '../../Config';

interface Props { }

export const responsiveRows = {
  small: ['auto', 'auto', 'auto', 'auto', 'auto'],
  medium: ['auto', 'auto', 'auto'],
  large: ['auto', 'auto'],
} as any;

export const responsiveColumns = {
  small: ['flex'],
  medium: ['flex', 'flex', 'flex'],
  large: ['flex', 'flex', 'flex', 'flex'],
} as any;


const Login: React.FC<Props> = () => {
  const size = React.useContext(ResponsiveContext);

  return (
    <PageWrapper>
      <Box align="center" margin={{ top: "large" }}>
        <Tile width={size} animation="fadeIn" pad="large" justify="center">
          <Heading
            level={3}
            i18nKey="auth.Login.loginToApp"
            i18nValues={{ appName: Config.appName }}
          />
          <Button
            icon={<img
              src={GoogleIcon}
              style={{ width: '24px' }}
              alt="View in Drive"
            />}
            onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}
            i18nKey="auth.Login.continueWithGoogle"
          />
        </Tile>
      </Box >
    </PageWrapper >
  );
};
export default Login;
