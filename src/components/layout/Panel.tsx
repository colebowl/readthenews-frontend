import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

const Panel: React.FC = ({ children }) => {
  return (
    <Box
      background={{ dark: 'dark-3', light: 'white' }}
      pad="medium"
      width="xlarge"
      round="xxsmall"
      elevation="small"
      margin={{
        bottom: "xlarge"
      }}
    >
      {children}
    </Box>
  )
};

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Panel;

