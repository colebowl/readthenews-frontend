import React from 'react';
import moment from 'moment';
import { Box } from 'grommet';
import { gql } from '@apollo/client';

import useSelectedEmail from '../../hooks/emails/useSelectedEmail';
import EmailsList from './EmailsList';

interface Props { }

const query = gql`
  query GetEmailsOfSubscription($startDate: String!) {
    listEmails(filter: { receivedAt: { gt: $startDate } }) {
      items {
        body
        fromAddress
        id
        subscriptionId
        read
        receivedAt
        subject
      }
    }
  }
`;

const EmailsReceivedToday: React.FC<Props> = () => {
  const { setSelectedEmail } = useSelectedEmail();
  return (
    <Box>
      <EmailsList
        onEmailClick={setSelectedEmail}
        query={query}
        queryVars={{ variables: { startDate: moment().startOf('day').format() } }}
      />
    </Box>
  )
};

export default EmailsReceivedToday;
