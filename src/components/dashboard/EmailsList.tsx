import React from 'react';
import { Avatar, Box, Button, Heading, List, Text } from 'grommet';
import { DocumentNode, useQuery, OperationVariables, gql, useMutation } from '@apollo/client';
import moment from 'moment';

import Spinner from '../shared/Spinner';
import Pill from '../shared/ui/Pill';
import { Email, Subscription } from '../../shared/types';
import useSelectedEmail from '../../hooks/emails/useSelectedEmail';
import { listSubscriptionsQuery } from './SubscriptionsAccordion';



const markEmailReadQuery = gql`
  mutation MarkEmailAsRead($id: String!) {
    markEmailAsRead(id: $id, read: true) {
      read
    }
  }
`;

interface Props {
  subscription?: Subscription;
  onEmailClick: (email: Email) => void;
  query: DocumentNode
  queryVars?: OperationVariables;
}

const EmailsList: React.FC<Props> = (props) => {
  const { onEmailClick, query, subscription, queryVars } = props;
  const { selectedEmail } = useSelectedEmail();

  const [markEmailAsRead] = useMutation(markEmailReadQuery);
  const { loading, data } = useQuery(query, queryVars);
  const { data: allSubscrpitions } = useQuery(listSubscriptionsQuery);

  const emailsList = React.useMemo(() => {
    if (!data || !data.listEmails) return [];

    return [...data.listEmails.items].sort(
      (a: Email, b: Email) => {
        return new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
      }
    )
  }, [data]);

  return (
    <Box>
      {subscription && (
        <Box

          margin={{ horizontal: 'small' }}
          border={{ side: 'horizontal', color: "light-2" }}
          pad={{ bottom: 'medium' }}
        >
          <Box flex direction="row" align="center">
            <Avatar
              margin={{ right: 'small' }}
              size="medium"
              src={subscription.iconUrl || `https://ui-avatars.com/api/?name=${subscription.name}`}
            />
            <Box flex>
              <Heading level="6">{subscription.name}</Heading>
            </Box>
          </Box>
          <Text size="small">Subscribed since: {moment(subscription.registeredAt).format('MMM YYYY')}</Text>
        </Box>
      )}

      {loading ? <Spinner /> : (
        <List
          primaryKey="receivedAt"
          border={{ side: 'horizontal', color: "light-2" }}
          pad="none"
          secondaryKey="subject"
          onClickItem={({ item }: any) => onEmailClick(item as Email)}
          data={emailsList}
        >
          {(item: Email) => {
            const itemSelected = selectedEmail && selectedEmail.id === item.id;
            const itemSubscription: Subscription = allSubscrpitions.listSubscriptions && allSubscrpitions.listSubscriptions
              .items
              .find((sub: Subscription) => sub.id === item.subscriptionId);

            return (
              <Box
                onClick={() => {
                  if (!item.read) {
                    markEmailAsRead({ variables: { id: item.id } });
                  }
                }}
                background={(itemSelected || !item.read ? 'light-1' : undefined)}
                key={item.id}
                border={{ side: 'left', size: '3px', color: itemSelected || !item.read ? 'brand' : 'transparent' }}
                pad="small"
              >
                {!subscription && (
                  <Box flex direction="row" align="center" margin={{ bottom: 'small' }}>
                    <Avatar
                      margin={{ right: 'xsmall' }}
                      size="small"
                      src={itemSubscription.iconUrl}
                    />
                    <Box flex>
                      <Text size="small">{itemSubscription.name}</Text>
                    </Box>
                  </Box>
                )}
                <Box alignSelf="start">
                  <Text size="small">
                    {moment(item.receivedAt).calendar({
                      sameDay: 'h:mm a',
                      lastDay: '[Yesterday at ] h:mm a',
                      lastWeek: 'dddd',
                      sameElse: 'MMM DD Do'
                    })}
                  </Text>

                  <Text size="medium" weight="bold">{item.subject}</Text>

                  <Box flex direction="row" margin={{ top: 'small' }}>
                    {moment(item.receivedAt).isAfter(moment().subtract(6, 'hours')) && <Pill label="New" background="#41ae76" margin={{ right: 'xsmall' }} />}
                    {!item.read && <Pill label="Unread" background="brand" />}
                  </Box>
                </Box>
              </Box>
            )
          }}
        </List>
      )
      }
    </Box>
  )
};

export default EmailsList;
