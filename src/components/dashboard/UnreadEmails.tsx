import React from 'react';
import { gql } from '@apollo/client';

import EmailsList from './EmailsList';
import useSelectedEmail from '../../hooks/emails/useSelectedEmail';

const query = gql`
  query GetEmailsOfSubscription {
    listEmails(filter: { read: { eq: false }}, limit: 50) {
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
    <EmailsList
      onEmailClick={setSelectedEmail}
      query={query}
    />
  )
};

export default SubscriptionsList;
