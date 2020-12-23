import React from 'react';
import { Box } from 'grommet';
import { useMutation } from '@apollo/client';

import EditSubscriptionForm, { FormFields } from './EditSubscription';
import useSubscriptions from '../../../hooks/subscriptions/useSubscriptions';
import useToast from '../../../hooks/shared/useToast';
import { createSubscription } from '../../../graphql/mutations';
import { listSubscriptionsQuery } from 'graphql/queries';
import { SubscriptionsList } from 'shared/types';

type Props = {
  onSubmit: () => void;
};

const NewSubscription: React.FC<Props> = (props) => {
  const { subscriptions } = useSubscriptions();
  const toasts = useToast();

  const [createSubscriptionMutation] = useMutation(createSubscription);

  const handleCreateSubscription = async (subscription: FormFields) => {
    const { iconUrl, ...restSubscription } = subscription;

    const result = await createSubscriptionMutation(
      {
        variables: { input: restSubscription },
        update: (cache, { data: createSubscription }) => {
          const data: SubscriptionsList | null = cache.readQuery({ query: listSubscriptionsQuery });
          if (data && data.listSubscriptions) {
            cache.writeQuery({
              query: listSubscriptionsQuery,
              data: {
                listSubscriptions: [
                  ...data.listSubscriptions.items,
                  createSubscription
                ]
              }
            });
          }
        }
      });


      console.log('result:', result)
    toasts.success('New subscription created successfully');
    props.onSubmit();
  }

  return (
    <Box pad="medium" animation="fadeIn">
      <EditSubscriptionForm
        onSubmit={handleCreateSubscription}
        icons={{}}
        existingAliases={Object.values(subscriptions).map(sub => sub.emailAddress.split('@')[0])}
        values={{
          name: '',
          alias: '',
          iconUrl: '',
          color: ''
        }}
      />
    </Box>
  );
}

NewSubscription.defaultProps = {

};

NewSubscription.propTypes = {

};

export default NewSubscription;

