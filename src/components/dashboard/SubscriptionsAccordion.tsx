import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Accordion, AccordionPanel, Avatar, Box, Text } from 'grommet';
import { useQuery } from '@apollo/client';
import { Subscription, SubscriptionsList } from '../../shared/types';

import Spinner from '../shared/Spinner';
import useSelectedSubscription from '../../hooks/subscriptions/useSelectedSubscription';

import { listSubscriptionsQuery} from '../../graphql/queries';

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
  const [open, setOpen] = React.useState<number[]>([0]);
  const { selectedSubscription, setSelectedSubscription } = useSelectedSubscription()
  const { loading, data } = useQuery<SubscriptionsList>(listSubscriptionsQuery);

  const setSelected = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    history.push(`/subscription`)
  };

  const subscriptions = React.useMemo(() => {
    const initialGroups = { active: [], pending: [] } as { active: Subscription[]; pending: Subscription[] };
    if (!data || !data.listSubscriptions) return initialGroups;

    return data.listSubscriptions.items.reduce((grouped, sub: Subscription) => {
      if (sub.status === 'pending') grouped.pending.push(sub);
      if (sub.status === 'active') grouped.active.push(sub);
      return grouped;
    }, initialGroups)
  }, [data]);

  return (
    <Accordion animate multiple activeIndex={open} onActive={setOpen} >
      <AccordionPanel label="Subscriptions" >
        <Box height="auto">
          {loading ? <Spinner /> : (
            <List>
              {subscriptions.active.map((subscription) => (
                <ListItem
                  key={subscription.id}
                  onClick={() => setSelected(subscription)}
                  isActive={selectedSubscription ? subscription.id === selectedSubscription.id : false}
                >
                  <Avatar
                    margin={{ right: 'small' }}
                    size="small"
                    src={subscription.iconUrl || `https://ui-avatars.com/api/?name=${subscription.name}`}
                  />
                  <Box flex>
                    <Text size="small">{subscription.name}</Text>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </AccordionPanel>
      {subscriptions.pending.length > 0 && (
        <AccordionPanel label="Pending" >
          <Box height="auto">
            {loading ? <Spinner /> : (
              <List>
                {subscriptions.pending.map((subscription) => (
                  <ListItem
                    key={subscription.id}
                    onClick={() => setSelected(subscription)}
                    isActive={selectedSubscription ? subscription.id === selectedSubscription.id : false}
                  >
                    <Avatar
                      margin={{ right: 'small' }}
                      size="small"
                      src={subscription.iconUrl || `https://ui-avatars.com/api/?name=${subscription.name}`}
                    />
                    <Box flex>
                      <Text size="small">{subscription.name}</Text>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </AccordionPanel>
      )}
    </Accordion>
  )
}

export default SubscriptionsAccordion;
