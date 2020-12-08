import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, Menu, Nav } from 'grommet';
import { User } from 'grommet-icons';
import { RootState } from '../../store';
import { setMode } from '../../store/app/actions';
import Link from '../shared/Link';
import Config from '../../Config';
import ToggleLocale from '../shared/translation/ToggleLocale';

import AuthState from '../../store/auth/actions';
const AppBar: React.FC = () => {
  const { isAuthenticated, profile } = useSelector((st: RootState) => st.auth);
  const { mode } = useSelector((st: RootState) => st.app);
  const dispatch = useDispatch();


  const [menuOpen, setMenuOpen] = React.useState(false);
  const handleSignoutClick = () => {
    console.log('dispatch sisgniout')
    setMenuOpen(false);
    dispatch(AuthState.actions.signOut());
  }

  return (
    <Box
      tag="header"
      direction='row'
      align='center'
      justify='between'
      // background={{light: 'brand', dark: 'dark-2'}}
      style={{ zIndex: 1 }}
    >
      <Link to="/">
        <Heading level="3" margin="none">
          {Config.appName}
        </Heading>
      </Link>
      <Box direction="row" align="center">
        <Nav direction="row">
          <Link to="/" i18n="layout.AppBar.home">Home</Link>
          {isAuthenticated && profile ? (
            <Link to="/dashboard" i18n="layout.AppBar.dashboard">
              Dashboard
            </Link>
          ) : (
            <Link to="/login" i18n="layout.AppBar.login">
              Login
            </Link>
          )}
        </Nav>
        <ToggleLocale />
        {isAuthenticated && profile && (
          <Menu
            open={menuOpen}
            margin="none"
            label={profile.name}
            icon={<User />}
            onClick={(e: any) => {
              e.preventDefault();
              setMenuOpen(true)
            }}
            items={[
              { label: 'Profile', onClick: () => {setMenuOpen(false) } },
              {
                label: `${mode} Mode`, onClick: () => {
                  dispatch(setMode(mode === 'light' ? 'dark' : 'light'))
                  setMenuOpen(true)
                }
              },
              { label: 'Signout', onClick: handleSignoutClick },
            ]}
          />
        )}
      </Box>
    </Box>
  )
};

AppBar.propTypes = {
}

export default AppBar;
