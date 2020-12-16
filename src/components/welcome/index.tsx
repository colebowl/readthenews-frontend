import React from 'react';
import { Anchor, Box, Button, Heading, Text } from 'grommet';
import ProfileForm, { FormFields as ProfileFormFields } from './ProfileForm';
import useProfile from 'hooks/auth/useProfile';
import { useHistory } from 'react-router-dom';

type Props = {}

const Welcome: React.FC<Props> = (props) => {
  const { profile } = useProfile();
  const history = useHistory();

  const [visiblePage, setVisiblePage] = React.useState<'profile' | 'payment' | 'welcome'>('profile')

  const titles = {
    profile: 'Complete your profile',
    payment: 'Payment',
    welcome: 'Welcome'
  }

  return (
    <Box fill align="center" justify="center">
      <Box align="center">
        <Heading level="3" margin={{ bottom: 'medium' }}>
          {titles[visiblePage]}
        </Heading>
        <Box border={{ side: 'all', color: 'light-5' }} pad="medium" fill>
          {visiblePage === 'profile' && (
            <Box animation="fadeIn">
              <ProfileForm
                values={{
                  name: profile ? `${profile.given_name} ${profile.family_name}` : '',
                  subdomain: '',
                  agreeToTerms: false
                }}
                onSubmit={(input: ProfileFormFields) => {
                  console.log('input:', input)

                  setVisiblePage('payment');
                }} />
            </Box>
          )}

          {visiblePage === 'payment' && (
            <Box animation="fadeIn">
              <Heading level="5">thru is currently in beta and payment is not required</Heading>

              <Box
                tag="footer"
                margin={{ top: "small" }}
                direction="row"
                justify="end"
              >
                <Button label="Next" onClick={() => setVisiblePage('welcome')} />
              </Box>
            </Box>
          )}
          {visiblePage === 'welcome' && (
            <Box animation="fadeIn" style={{ maxWidth: 500 }}>
              <Heading level="5">thru currently requires the thru Chrome extension</Heading>
              <Text margin={{ 'bottom': 'medium' }}>In order to be able to create new thru subscriptions, you will need to download the Chrome extension.</Text>
              <Anchor href="https://chrome.google.com/webstore/category/extensions?hl=en" target="_blank">Download the extension</Anchor>

              <Box
                tag="footer"
                margin={{ top: "small" }}
                direction="row"
                justify="end"
              >
                <Button label="Get Started" onClick={() => history.push('/')} />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Welcome;
