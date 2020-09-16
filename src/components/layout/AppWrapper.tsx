import React from 'react';
import PropTypes from 'prop-types';
import { Box, Collapsible } from 'grommet';

import AppBar from './AppBar';

interface Props { }
const AppWrapper: React.FC<Props> = (props) => {
  const { children } = props;
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <Box>
      <AppBar toggleSidebar={() => setShowSidebar(!showSidebar)} />

      <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
        {children}
        <Collapsible direction="horizontal" open={showSidebar}>
          <Box
            flex
            width='medium'
            background='light-2'
            elevation='small'
            align='center'
            justify='center'
          >
            sidebar
            </Box>
        </Collapsible>
      </Box>
    </Box>


  );
};

AppWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
export default AppWrapper;


// import UserSearchForm from './Form';
// import CompanyProfileForm from './components/forms/CompanyProfile';


{/* <Box flex align='center'>
<Box width="large" round="xsmall" margin="large" elevation="medium" pad="medium">
  <CompanyProfileForm />
</Box>
<Box width="large" round="xsmall" margin="large" elevation="medium" pad="medium">
  <UserSearchForm />
</Box>

</Box> */}
