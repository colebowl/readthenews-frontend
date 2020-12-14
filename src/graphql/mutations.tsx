import { gql } from '@apollo/client';

export const markEmailReadQuery = gql`
  mutation MarkEmailAsRead($id: String!) {
    markEmailAsRead(id: $id, read: true) {
      id
      read
    }
  }
`;
