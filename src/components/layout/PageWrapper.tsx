import React from 'react';
import PropTypes from 'prop-types';
import { Main } from 'grommet';
import { PadType } from 'grommet/utils';
import AppBar from './AppBar';

interface Props {
  children: any;
  hideAppBar?: boolean;
  pad?: PadType;
}

const PageWrapper: React.FC<Props> = (props) => {
  const { children, hideAppBar, pad } = props;
  return (
    <Main
      // background={{ "dark": "dark-1", "light": "white" }}
      // background={{ "dark": "dark-1", "light": "#95ff98" }}
      pad={pad}
    >
      {!hideAppBar && <AppBar />}
      {children}
    </Main>
  );
};

PageWrapper.defaultProps = {
  hideAppBar: false,
  pad: { horizontal: "large", vertical: "small" },
};

PageWrapper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pad: PropTypes.object,
  hideAppBar: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
export default PageWrapper;
