import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Box, Heading, Text } from 'grommet';
import { useQuery } from '@apollo/client';
import { Subscription, SubscriptionsList } from '../../shared/types';

import Spinner from '../shared/Spinner';
import useSelectedSubscription from '../../hooks/subscriptions/useSelectedSubscription';

import { listSubscriptionsQuery } from '../../graphql/queries';
import Avatar from '../shared/Avatar';

const List = styled.ul`
  margin-top: 0;
  padding-left: 0;
`
interface ListItemProps { readonly isActive: boolean };

const ListItem = styled.li<ListItemProps>`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin-left: 0;
  border-left: 3px solid transparent;

  padding:  0.5rem;

  &:hover {
    cursor: pointer;
    background: #ededed;
  }

  ${props => props.isActive && `
    background #ededed;
    border-left-color: #444444;
  `}
`;

interface Props {
  // activeSubscription?: Subscription;
  // onSubscriptionClick: (subscription: Subscription) => void;
}

const SubscriptionsAccordion: React.FC<Props> = () => {
  const history = useHistory();
  const { selectedSubscription, setSelectedSubscription } = useSelectedSubscription()
  const { loading, data } = useQuery<SubscriptionsList>(listSubscriptionsQuery);
  console.log('data:', data)

  if (data) {
    data.listSubscriptions.items.forEach(it => {
      if (it.color) console.log(it.name, 'has a color => ', it.color)
    })
  }

  const setSelected = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    const slug = subscription.name.split('@')[0]
    history.push(`/subscription/${slug}`);
  };

  return (
    <>
      <Heading level="5" margin={{ left: 'small' }}>My Trays</Heading>
      {loading ? <Spinner /> : (
        <Box height="auto" fill overflow="auto">
          <List>
            {data && data.listSubscriptions.items.map((subscription) => (
              <ListItem
                key={subscription.id}
                onClick={() => setSelected(subscription)}
                isActive={selectedSubscription ? subscription.id === selectedSubscription.id : false}
              >
                <Avatar
                  margin={{ right: 'small' }}
                  size="small"
                  src={subscription.iconUrl}
                  color={subscription.color}
                  name={subscription.name}
                />
                <Box flex>
                  <Text size="small">{subscription.name}</Text>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </>
  )
}

export default SubscriptionsAccordion;
