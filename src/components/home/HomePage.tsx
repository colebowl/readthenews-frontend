import { Box } from 'grommet';
import React from 'react';
import { Link } from 'react-router-dom';

import PageWrapper from '../layout/PageWrapper';
import AppBar from '../layout/AppBar';

interface Props { }

const HomePage: React.FC<Props> = () => {
  return (
    <PageWrapper hideAppBar>
      <Box>
        <AppBar />
        <Link to="/register">Register</Link>
      </Box>
    </PageWrapper>
  );
};
export default HomePage;
