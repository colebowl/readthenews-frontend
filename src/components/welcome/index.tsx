import React from 'react';
import { Anchor, Box, Button, Heading, Text } from 'grommet';
import ProfileForm, { FormFields as ProfileFormFields } from './ProfileForm';
import useProfile from 'hooks/auth/useProfile';
import { useHistory } from 'react-router-dom';

type Props = {}

const Welcome: React.FC<Props> = (props) => {
  const { profile } = useProfile();
  const history = useHistory();

  const [visiblePage, setVisiblePage] = React.useState<'profile' | 'payment' | 'welcome'>('welcome')

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
              <Heading level="3">Welcome to thru<span style={{ color: '#de8626' }}>.</span></Heading>
              <Text margin={{ 'bottom': 'medium' }}>Thank you for being one of the very first people to try out <b>thru</b>!</Text>
              <Text margin={{ 'bottom': 'medium' }}><b>thru<span style={{ color: '#de8626' }}>.</span></b> is in public beta and we are still working out some of the kinks. If you notice something wonky or have feedback, drop us at line to <Anchor href="mailto:beta@cole.thru.email">beta@cole.thru.email</Anchor></Text>
              <Text margin={{ 'bottom': 'medium' }}>Thanks,</Text>
              <Text margin={{ 'bottom': 'medium' }}>Cole - thru<span style={{ color: '#de8626' }}>.</span> founder</Text>

              {/* <Heading level="5">thru currently requires the thru Chrome extension</Heading>
              <Text margin={{ 'bottom': 'medium' }}>In order to be able to create new thru subscriptions, you will need to download the Chrome extension.</Text>
              <Anchor href="https://chrome.google.com/webstore/category/extensions?hl=en" target="_blank">Download the extension</Anchor> */}

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
