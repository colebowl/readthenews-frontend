import React from 'react';
import {
  Heading,
  Menu,
  Header as GHeader,
  Avatar,
  Box,
} from 'grommet';

import { FormDown as FormDownIcon } from 'grommet-icons';
import { useDispatch } from 'react-redux';

import useProfile from '../../hooks/auth/useProfile';
import AuthState from '../../store/auth/actions';
import { setMode } from '../../store/app/actions';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { mode, profile } = useProfile();

  const handleSignoutClick = () => {
    dispatch(AuthState.actions.signOut());
  };

  return (
    <GHeader
      gridArea="header"
      border={{ side: 'horizontal', color: { dark: 'dark-4', light: 'light-2' } }}
      pad={{ horizontal: 'medium' }}
      // background={{light: 'brand', dark: 'dark-2'}}
      background={{ color: { dark: 'dark-3', light: 'light-2' } }}
    >
      <Heading level={1} margin="none">RTN<span style={{ color: '#de8626' }}>.</span></Heading>
      <Menu
        plain
        dropProps={{ align: { 'top': 'bottom' } }}
        items={[
          // { label: 'Profile', onClick: () => { console.log(false) } },
          {
            label: `Switch to ${mode === 'light' ? 'dark' : 'light'} mode`, onClick: () => {
              dispatch(setMode(mode === 'light' ? 'dark' : 'light'));
            }
          },
          { label: 'Signout', onClick: handleSignoutClick }
        ]}
      >
        {() => (
          <Box flex direction="row" align="center" justify="center">
            <Avatar
              size="small"
              margin={{ right: 'small' }}
              src={profile ? profile.picture : 'https://ui-avatars.com/api/?name=R'}
            />
            {' '}
            <Heading margin="none" level="6" >
              {profile ? `${profile.given_name} ${profile.family_name}` : 'User'}
            </Heading>
            <Box margin={{ left: 'small' }}>
              <FormDownIcon color="brand" />
            </Box>
          </Box>
        )}
      </Menu>
    </GHeader>
  );
}

Header.defaultProps = {

};

Header.propTypes = {

};

export default Header;
