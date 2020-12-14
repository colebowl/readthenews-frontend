import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxProps} from 'grommet';

interface Props extends BoxProps {
  children: any;
  title?: string;
  width?: string;
}

const Tile: React.FC<Props> = ({ children, title, ...restProps }) => (
  // eslint-disable-next-line
  <Box elevation="medium" {...restProps}>
    {/* <Box
      tag="header"
      pad={{ horizontal: 'small', top: 'small', bottom: 'medium' }}
      direction="row"
      justify="between"
      align="center"
    >
      <Heading level={3} size="xsmall" margin="none">
        {title}
      </Heading>
      <Button icon={<More color="control" />} />
    </Box> */}
    {children}
  </Box>
);

Tile.defaultProps = {
  title: undefined,
  width: undefined,
}

Tile.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  width: PropTypes.string,
  title: PropTypes.string
}

export default Tile;
