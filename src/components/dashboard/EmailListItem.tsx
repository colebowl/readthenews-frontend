import React from 'react';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { Box, Text } from 'grommet';

import { Email, Subscription } from '../../shared/types';
import { markEmailReadQuery } from '../../graphql/mutations';

import Pill from '../shared/ui/Pill';
import Avatar from '../shared/Avatar';

type Props = {
  email: Email;
  subscription?: Subscription;
  selected?: boolean;
  onClick: (email: Email) => void;
}

const EmailListItem: React.FC<Props> = (props) => {
  const {
    email,
    onClick,
    subscription,
    selected
  } = props;

  const [markEmailAsRead] = useMutation(markEmailReadQuery);

  return (
    <Box
      onClick={() => {
        onClick(email);

        if (!email.read) {
          markEmailAsRead({ variables: { id: email.id } });
        }
      }}
      background={(selected || !email.read ? 'light-1' : undefined)}
      key={email.id}
      border={[
        { side: 'horizontal', color: "light-2" },
        { side: 'left', size: '5px', color: selected || !email.read ? 'brand' : 'transparent' }
      ]}
      pad="small"
    >
      {subscription && (
        <Box flex direction="row" align="center" margin={{ bottom: 'small' }}>
          <Avatar
            margin={{ right: 'xsmall' }}
            size="small"
            color={subscription.color}
            name={subscription.name}
            url={subscription.iconUrl}
          />
          <Box flex>
            <Text size="small">{subscription.name}</Text>
          </Box>
        </Box>
      )}
      <Box alignSelf="start">
        <Text size="small">
          {moment(email.receivedAt) //.format()
            .calendar({
              sameDay: 'h:mm a',
              lastDay: '[Yesterday at ] h:mm a',
              lastWeek: 'dddd',
              sameElse: 'MMM DD Do'
            })
          }
        </Text>

        <Text size="medium" weight="bold">{email.subject}</Text>

        <Box flex direction="row" margin={{ top: 'small' }}>
          {moment(email.receivedAt).isAfter(moment().subtract(6, 'hours')) && <Pill label="New" background="#41ae76" margin={{ right: 'xsmall' }} />}
          {!email.read && <Pill label="Unread" background="brand" />}
        </Box>
      </Box>
    </Box>
  )
}

export default EmailListItem;
