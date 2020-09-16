import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Button, Heading, Menu } from 'grommet';
import { Notification, User } from 'grommet-icons';
import { RootState } from '../../store';
import { setMode } from '../../store/app/actions';
import Config from '../../Config';

interface Props {
  toggleSidebar: () => void;
}

const AppBar: React.FC<Props> = (props) => {
  const { isAuthenticated, profile } = useSelector((st: RootState) => st.auth);
  const { mode } = useSelector((st: RootState) => st.app);
  const dispatch = useDispatch();



  const { toggleSidebar } = props;
  return (
    <Box
      tag="header"
      direction='row'
      align='center'
      justify='between'
      background='brand'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      // elevation='medium'
      style={{ zIndex: 1 }}
    >
      <Heading level="3" margin="none">{Config.appName}</Heading>
      <div>
        <Button margin="none" icon={<Notification />} onClick={toggleSidebar} />
        {isAuthenticated && profile && (
          <Menu
            margin="none"
            label={profile.name}
            icon={<User />}
            items={[
              { label: 'Profile', onClick: () => { } },
              {
                label: `${mode} Mode`, onClick: () => {
                  dispatch(setMode(mode === 'light' ? 'dark' : 'light'))
                }
              },
              { label: 'Signout', onClick: () => { } },
            ]}
          />
        )}
      </div>
    </Box>
  )
};

AppBar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
}

export default AppBar;
