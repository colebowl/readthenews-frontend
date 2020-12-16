import React from 'react';
import { Image, Avatar, Box, InfiniteScroll, Heading, Text, Button } from 'grommet';
import { DocumentNode, useQuery, OperationVariables } from '@apollo/client';
import moment from 'moment';
import { useToasts } from 'react-toast-notifications';

import Spinner from '../shared/Spinner';
import EmailListItem from './EmailListItem';
import CopyableText from '../shared/CopyableText';

import { Email, Subscription, SubscriptionDictonary } from '../../shared/types';
import { listSubscriptionsQuery } from '../../graphql/queries';
import { subscriptionQuery } from '../../graphql/subscriptions';

import useSelectedEmail from '../../hooks/emails/useSelectedEmail';
import useProfile from 'hooks/auth/useProfile';

interface Props {
  subscription?: Subscription;
  onEmailClick: (email: Email) => void;
  query: DocumentNode
  queryVars?: OperationVariables;
}

const EmailsList: React.FC<Props> = (props) => {
  const { onEmailClick, query, subscription, queryVars } = props;
  const { profile } = useProfile()
  const { selectedEmail } = useSelectedEmail();

  const { loading, data, subscribeToMore } = useQuery(query, queryVars);
  const { data: allSubscrpitions } = useQuery(listSubscriptionsQuery);
  const { addToast } = useToasts()

  const subscriptionsList = React.useMemo<SubscriptionDictonary>(() => {
    if (!allSubscrpitions || !allSubscrpitions.listSubscriptions) return {} as SubscriptionDictonary;
    return allSubscrpitions
      .listSubscriptions
      .items
      .reduce(
        (all: SubscriptionDictonary, sub: Subscription) => ({
          ...all,
          [sub.id]: sub
        }),
        {}
      ) as SubscriptionDictonary;
  }, [allSubscrpitions]);



  React.useEffect(() => {
    if (Object.keys(subscriptionsList).length) {

      subscribeToMore({
        document: subscriptionQuery,
        variables: { userId: profile ? profile.id : '' },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newEmail = subscriptionData.data.onNewEmail.email;
          const next = {
            ...prev,
            listEmails: {
              ...prev.listEmails,
              items: [newEmail, ...prev.listEmails.items]
            }
          }
          addToast({ email: newEmail, subscription: subscriptionsList[newEmail.subscriptionId] || {} }, { appearance: 'info' });
          return next;
        }
      })
    }
    // eslint-disable-next-line
  }, [subscriptionsList]);

  const emailsList = React.useMemo(() => {
    if (!data || !data.listEmails) return [];

    return [...data.listEmails.items].sort(
      (a: Email, b: Email) => {
        return new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
      }
    )
  }, [data]);

  return (
    <Box flex={false} overflow={{ vertical: 'auto' }}>
      {subscription && (
        <Box
          flex
          margin={{ horizontal: 'small' }}
          border={{ side: 'horizontal', color: "light-2" }}
          pad={{ horizontal: 'small', vertical: 'medium' }}
        >
          <Box flex direction="row" align="center" margin={{ bottom: 'medium' }}>
            <Avatar
              margin={{ right: 'small' }}
              size="medium"
              src={subscription.iconUrl || `https://ui-avatars.com/api/?name=${subscription.name}`}
            />
            <Box flex>
              <Heading level="6" margin="none">{subscription.name}</Heading>
              <CopyableText
                textProps={{ size: 'small' }}
                text={subscription.emailAddress}
               />
              {/* <Text size="small">{subscription.emailAddress}</Text> */}
            </Box>
          </Box>
          <Text size="small">Subscribed since: {moment(subscription.registeredAt).format('MMM YYYY')}</Text>
        </Box>
      )}

      {loading ? <Spinner /> : (
        <>
          {!emailsList.length ? (
            <Box
              flex
              align="center"
              pad={{ vertical: 'large' }}
              justify="center"
              alignContent="center"
            >
              <Image src="/eyes2.png" width="40%" />
              <Heading level="6">Waiting for emails</Heading>
            </Box>
          ) : (
              <InfiniteScroll
                items={emailsList}
              // onMore={() => fetchMore({})}
              >
                {(email: Email) => (
                  <EmailListItem
                    key={email.id}
                    email={email}
                    // this is a bit confusing. It needs to be renamed better
                    // if the list is loaded while viewing a specific subsciption
                    // then don't pass it through to the card as the subscription
                    // card is shown above the list. If it is not passed and we are
                    // looking at generic list (unread/today etc) then provide the
                    // subscription so the ui can display the subscription inline in
                    // the card.
                    subscription={subscription ? undefined : subscriptionsList[email.subscriptionId]}
                    selected={selectedEmail?.id === email.id}
                    onClick={(email: Email) => onEmailClick(email)}
                  />
                )}
              </InfiniteScroll>
            )}
        </>
      )}
    </Box >
  )
};

export default EmailsList;
