import React from 'react';
import moment from 'moment';
import { gql } from '@apollo/client';

import useSelectedEmail from '../../hooks/emails/useSelectedEmail';
import EmailsList from './EmailsList';

interface Props { }

const query = gql`
  query GetEmailsOfSubscription($startDate: String!) {
    listEmails(filter: { receivedAt: { gt: $startDate } }, limit: 50) {
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
    <EmailsList
      onEmailClick={setSelectedEmail}
      query={query}
      queryVars={{ variables: { startDate: moment().startOf('week').format() } }}
    />
  )
};

export default EmailsReceivedToday;
