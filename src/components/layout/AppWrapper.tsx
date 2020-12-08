import React from 'react';
import PropTypes from 'prop-types';
import { Main, Box } from 'grommet';

import AppBar from './AppBar';

interface Props { }
const AppWrapper: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <>
      {/* <AppBar /> */}
      {/* <Box
        align='center'
        justify='center'
        flex="grow"
        direction='row'
      > */}
        {children}
      {/* </Box> */}
    </>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
export default AppWrapper;
