import React from 'react';
import moment from 'moment';
import { Box, Text, Grommet, Button, Heading } from 'grommet';
import { Close as CloseIcon } from 'grommet-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import theme from '../../theme';
import Avatar from '../shared/Avatar';

type ToastWrapperProps = {
  appearance?: 'success' | 'error';
}

const ToastWrapper: React.FC<ToastWrapperProps> = (props) => {
  const { mode } = useSelector((st: RootState) => st.app);

  const colors = {
    success: 'green',
    error: 'red',
    brand: 'brand'
  };

  return (
    <Grommet theme={theme} themeMode={mode}>
      <Box
        elevation="medium"
        width="medium"
        background="light-1"
        margin={{ top: 'xlarge' }}
        border={{ side: 'left', size: '6px', color: colors[props.appearance || 'brand'] }}
        pad="small"
      >
        {props.children}
      </Box>
    </Grommet>
  )
}

const ToastMessage: React.FC<any> = (props) => {
  if (props.appearance !== 'info') {
    const { heading, message } = props.children
    return (
      <ToastWrapper {...props} appearance={props.appearance}>
        <Box pad="small" align="start">
          {heading && <Heading level="5">{heading}</Heading>}
          {message && <Text>{message}</Text>}
        </Box>
      </ToastWrapper >
    );
  }

  const { email, subscription } = props.children;
  return (
    <ToastWrapper>
      <Box justify="between" direction="row" align="center">
        <Box flex direction="row" align="center" margin={{ bottom: 'small' }}>
          <Avatar
            margin={{ right: 'xsmall' }}
            size="small"
            src={subscription.iconUrl}
            color={subscription.color}
            name={subscription.name}
          />
          <Box flex>
            <Text size="small">{subscription.name}</Text>
          </Box>
        </Box>

        <Box flex={false}>
          <Button icon={<CloseIcon size="small" />} onClick={props.onDismiss} />
        </Box>
      </Box>

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
      </Box>
    </ToastWrapper>
  );
}

ToastMessage.defaultProps = {

};

ToastMessage.propTypes = {

};

export default ToastMessage;


