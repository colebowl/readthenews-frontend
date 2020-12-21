import { useQuery } from '@apollo/client';
import React from 'react';

import { listSubscriptionsQuery } from '../../graphql/queries';
import { Subscription, SubscriptionDictonary } from '../../shared/types';

const useSubscriptions = () => {
  const { loading, data: allSubscrpitions } = useQuery(listSubscriptionsQuery);

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

  return { loading, subscriptions: subscriptionsList };
};

export default useSubscriptions;
