import { gql } from '@apollo/client';

export const markEmailReadQuery = gql`
  mutation MarkEmailAsRead($id: String!) {
    markEmailAsRead(id: $id, read: true) {
      id
      read
    }
  }
`;

export const onboardingSetUserProfile = gql`
  mutation onboardingSetUserProfile($input: userOnboardingSetProfileInput!) {
    userOnboardingSetProfile(input: $input) {
      name
      subdomain
    }
  }
`

export const createSubscription = gql`
  mutation($input: CreateSubscriptionInput!) {
    createSubscription(input: $input) {
        id
        emailAddress
        registeredAt
        status
        iconUrl
        name
        url
    }
  }
`;

export const deleteSubscription = gql`
  mutation($input: DeleteSubscriptionInput!) {
    deleteSubscription(input: $input) {
        id
    }
  }
`;
