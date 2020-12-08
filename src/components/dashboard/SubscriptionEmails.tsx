import React from 'react';
import { Avatar, Box, Heading, List, Text } from 'grommet';
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';

import EmailsList from './EmailsList';
import useSelectedSubscription from '../../hooks/subscriptions/useSelectedSubscription';
import useSelectedEmail from '../../hooks/emails/useSelectedEmail';

interface Props {
}

const query = gql`
  query GetEmailsOfSubscription($subscriptionId: String!) {
    listEmails(id: $subscriptionId) {
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

const SubscriptionsList: React.FC<Props> = () => {
  const { selectedSubscription } = useSelectedSubscription();
  const { setSelectedEmail } = useSelectedEmail();
  const subscriptionId = selectedSubscription ? selectedSubscription.id : '';

  return (
    <Box>
      <EmailsList
        subscription={selectedSubscription}
        onEmailClick={setSelectedEmail}
        query={query}
        queryVars={{ variables: { subscriptionId } }}
      />
    </Box>
  )
};

export default SubscriptionsList;
