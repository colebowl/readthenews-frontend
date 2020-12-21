import React from 'react';
import { Box, InfiniteScroll } from 'grommet';
import { DocumentNode, useQuery, OperationVariables } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';

import Spinner from '../shared/Spinner';
import EmailListItem from './EmailListItem';
import NoEmailsMessage from './emails-list/NoEmailsMessage';

import { Email, Subscription, SubscriptionDictonary } from '../../shared/types';
import { listSubscriptionsQuery } from '../../graphql/queries';
import { subscriptionQuery } from '../../graphql/subscriptions';

import useSelectedEmail from '../../hooks/emails/useSelectedEmail';
import useProfile from 'hooks/auth/useProfile';
import SubscriptionHeader from './emails-list/SubscriptionHeader';

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
      {subscription && <SubscriptionHeader subscription={subscription} />}

      {
        loading ? <Spinner /> : (
          <>
            {!emailsList.length
              ? <NoEmailsMessage />
              : (
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
        )
      }
    </Box >
  )
};

export default EmailsList;
