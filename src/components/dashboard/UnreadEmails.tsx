import React from 'react';
import { Box } from 'grommet';
import { gql } from '@apollo/client';

import EmailsList from './EmailsList';
import useSelectedEmail from '../../hooks/emails/useSelectedEmail';


const query = gql`
  query GetEmailsOfSubscription {
    listEmails(filter: { read: { eq: false }}) {
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


const SubscriptionsList: React.FC = () => {
  const { setSelectedEmail } = useSelectedEmail();

  return (
    <Box>
      <EmailsList
        onEmailClick={setSelectedEmail}
        query={query}
      />
    </Box>
  )
};

export default SubscriptionsList;
