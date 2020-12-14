import React from 'react';
import { gql } from '@apollo/client';

import EmailsList from './EmailsList';
import useSelectedSubscription from '../../hooks/subscriptions/useSelectedSubscription';
import useSelectedEmail from '../../hooks/emails/useSelectedEmail';

const query = gql`
  query GetEmailsOfSubscription($subscriptionId: String!) {
    listEmails(id: $subscriptionId, limit: 50) {
      items {
        body
        fromAddress
        id
        read
        receivedAt
        subject
      }
    }
  }
`;

const SubscriptionsList: React.FC = () => {
  const { selectedSubscription } = useSelectedSubscription();
  const { setSelectedEmail } = useSelectedEmail();
  const subscriptionId = selectedSubscription ? selectedSubscription.id : '';

  return (
      <EmailsList
        subscription={selectedSubscription}
        onEmailClick={setSelectedEmail}
        query={query}
        queryVars={{ variables: { subscriptionId } }}
      />
  )
};

export default SubscriptionsList;
