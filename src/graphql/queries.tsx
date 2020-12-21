import { gql } from '@apollo/client';

export const listSubscriptionsQuery = gql`
  query GetMySubscriptions {
    listSubscriptions {
      items {
        id
        emailAddress
        registeredAt
        status
        name
        iconUrl
        url
        color
      }
    }
  }
`;
