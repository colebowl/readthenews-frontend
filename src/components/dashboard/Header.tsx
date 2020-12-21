import React from 'react';
import {
  Heading,
  Menu,
  Header as GHeader,
  Box,
  Text,
  DropButton,
} from 'grommet';

import { Inbox, FormDown as FormDownIcon } from 'grommet-icons';
import { useDispatch } from 'react-redux';

import useProfile from '../../hooks/auth/useProfile';
import AuthState from '../../store/auth/actions';
// import { setMode } from '../../store/app/actions';
import Avatar from '../shared/Avatar';
import NewSubscription from './modal/NewSubscription';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { mode, profile } = useProfile();
  const [newSubFormOpen, setNewSubFormOpen] = React.useState<boolean>(false);

  const handleSignoutClick = () => {
    dispatch(AuthState.actions.signOut());
  };

  return (
    <GHeader
      gridArea="header"
      border={{ side: 'horizontal', color: { dark: 'dark-4', light: 'light-4' } }}
      pad={{ horizontal: 'medium' }}
      background={{ color: { dark: 'dark-3', light: 'light-2' } }}
    >
      <Heading level={1} margin="none">thru<span style={{ color: '#de8626' }}>.</span></Heading>

      <Box direction="row">
        <Box fill={false} margin={{ right: 'medium' }}>
          <DropButton
            label={<Text size="small">New Tray</Text>}
            open={newSubFormOpen}
            onClick={() => setNewSubFormOpen(open => !open)}
            icon={<Inbox size="medium" />}
            dropAlign={{ top: 'bottom', right: 'right' }}
            dropContent={
              <Box pad="small" background="light-2" >
                <NewSubscription onSubmit={() => setNewSubFormOpen(false)} />
              </Box>
            }
          />
        </Box>
        <Menu
          plain
          dropProps={{ align: { 'top': 'bottom' } }}
          items={[
            // {
            //   label: `Switch to ${mode === 'light' ? 'dark' : 'light'} mode`, onClick: () => {
            //     dispatch(setMode(mode === 'light' ? 'dark' : 'light'));
            //   }
            // },
            { label: 'Signout', onClick: handleSignoutClick }
          ]}
        >
          {() => (
            <Box flex direction="row" align="center" justify="center">
              <Avatar
                size="small"
                margin={{ right: 'small' }}
                name={profile && `${profile.family_name} ${profile.given_name}`}
                url={profile && profile.picture}
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
      </Box>
    </GHeader>
  );
}

Header.defaultProps = {

};

Header.propTypes = {

};

export default Header;
