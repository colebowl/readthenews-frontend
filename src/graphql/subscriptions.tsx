import { gql } from '@apollo/client';

export const subscriptionQuery = gql`
  subscription MySubscription($userId: String!) {
    onNewEmail(userId: $userId) {
      email {
        fromAddress
        id
        read
        receivedAt
        userId
        subscriptionId
        subject
      }
    }
  }
`;
