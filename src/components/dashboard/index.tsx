import React from 'react';
import { Box, Grid } from 'grommet';
import { Route, Switch } from 'react-router-dom';

import SideBar from './SideBar';
import SubscriptionEmails from './SubscriptionEmails';
import EmailsReceivedToday from './EmailsReceivedToday';
import UnreadEmails from './UnreadEmails';
import Header from './Header';

import useSelectedEmail from '../../hooks/emails/useSelectedEmail';


const Dashboard: React.FC = () => {
  const { selectedEmail } = useSelectedEmail();
  const iframeRef = React.useRef<any>();
  return (
    <>
      <Grid
        fill
        style={{ minHeight: '100vh' }}
        columns={['20%', '30%', '50%']}
        rows={['70px', 'flex']}
        areas={[
          { name: 'header', start: [0, 0], end: [2, 0] },
          { name: 'left', start: [0, 1], end: [0, 1] },
          { name: 'center', start: [1, 1], end: [1, 1] },
          { name: 'main', start: [2, 1], end: [2, 1] },
        ]}
      >
        <Header />
        <SideBar />
        <Box
          overflow={{ vertical: 'auto' }}
          // background={{ dark: 'dark-6' }}
          // border={{

          //   color: { dark: 'dark-4', light: 'light-4' },
          //   side: 'right'
          // }}
          gridArea="center"
        >

          <Switch>
            <Route path="/today" exact component={EmailsReceivedToday} />
            <Route path="/unread" exact component={UnreadEmails} />
            <Route path="/subscription" component={SubscriptionEmails} />
          </Switch>
        </Box>
        <Box gridArea="main" background="light-1" fill>
          {selectedEmail && (
            <iframe
              ref={(r: any) => { iframeRef.current = r; }}
              style={{ height: '100%' }}
              frameBorder="0"
              srcDoc={decodeURI(selectedEmail.body)} title="email content" />
          )}
        </Box>
      </Grid>
    </>
  );
};

export default Dashboard;
