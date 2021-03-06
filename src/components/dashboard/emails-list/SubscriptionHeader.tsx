import React from 'react';
import { Box, Heading, Text, Menu, Button } from 'grommet';
import moment from 'moment';

import { BsThreeDotsVertical } from 'react-icons/bs';
import Avatar from '../../shared/Avatar';
import CopyableText from '../../shared/CopyableText';
import ModalWindow from '../../shared/ModalWindow';

import useToast from '../../../hooks/shared/useToast';
import { Subscription, SubscriptionsList } from '../../../shared/types';
import { deleteSubscription } from '../../../graphql/mutations';
import { listSubscriptionsQuery } from '../../../graphql/queries';


import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

type Props = {
  subscription: Subscription;
}

const SubscriptionHeader: React.FC<Props> = (props) => {
  const { subscription } = props;
  const history = useHistory();
  const toasts = useToast();

  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);

  const [doDeleteSubscription, { error, loading: deleteInProgress }] = useMutation(deleteSubscription);

  if (error) {
    console.log('error:', error)
  }

  const handleDeleteClick = async () => {
    await doDeleteSubscription(
      {
        variables: { input: { id: subscription.id } },
        update: (cache, { data: deleteSubscription }) => {
          const data: SubscriptionsList | null = cache.readQuery({ query: listSubscriptionsQuery });
          if (data && data.listSubscriptions) {
            cache.writeQuery({
              query: listSubscriptionsQuery,
              data: {
                listSubscriptions: data.listSubscriptions.items.filter(sub => sub.id !== deleteSubscription.id)
              }
            });
          }
        }
      },
    );

    history.push('/today');
    toasts.success('Subscription successfully deleted');
  }

  return (
    <>
      <Box
        flex
        margin={{ horizontal: 'small' }}
        border={{ side: 'horizontal', color: "light-2" }}
        pad={{ horizontal: 'small', vertical: 'medium' }}
      >
        <Box direction="row" justify="between">
          <Box>
            <Box flex direction="row" align="center" margin={{ bottom: 'medium' }}>
              <Avatar
                margin={{ right: 'small' }}
                size="medium"
                name={subscription.name}
                url={subscription.iconUrl}
                color={subscription.color}
              />
              <Box flex>
                <Heading level="6" margin="none">{subscription.name}</Heading>
                <CopyableText
                  textProps={{ size: 'small' }}
                  text={subscription.emailAddress}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <Menu
              dropProps={{
                align: { top: 'bottom', right: 'right' },
                elevation: 'xlarge',
              }}
              hoverIndicator
              icon={<BsThreeDotsVertical size="24px" />}
              items={[
                { label: 'Edit', onClick: () => { } },
                { label: 'Delete', onClick: () => setDeleteModalOpen(true) },
              ]}
            />
          </Box>
        </Box>
        <Text size="small">Subscribed since: {moment(subscription.registeredAt).format('MMM YYYY')}</Text>
      </Box>

      <ModalWindow
        loading={deleteInProgress}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        heading={`Delete Tray - ${subscription.name}`}
        message={`Are you sure you want to delete this tray and all emails in it? This action can not be undone!`}
        buttons={[
          <Button
            label={
              <Text color="white">
                <strong>Delete</strong>
              </Text>
            }
            onClick={handleDeleteClick}
            primary
            color="status-critical"
          />
        ]}
      />
    </>
  );
}

export default SubscriptionHeader;
