import React from 'react';
import moment from 'moment';
import { Avatar, Box, Text, Grommet, Button } from 'grommet';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import theme from '../../theme';
import { Close as CloseIcon } from 'grommet-icons';

const ToastMessage: React.FC<any> = (props) => {
  const { mode } = useSelector((st: RootState) => st.app);
  const { email, subscription } = props.children;

  // if (props.appearance !== 'info') return
  return (
    <Grommet theme={theme} themeMode={mode}>
      <Box
        elevation="medium"
        width="medium"
        background="light-1"
        border={{ side: 'left', size: '3px', color: 'brand' }}
        pad="small"
      >
        <Box justify="between" direction="row" align="center">
          <Box flex direction="row" align="center" margin={{ bottom: 'small' }}>
            <Avatar
              margin={{ right: 'xsmall' }}
              size="small"
              src={subscription.iconUrl}
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
      </Box>
    </Grommet>
  );
}

ToastMessage.defaultProps = {

};

ToastMessage.propTypes = {

};

export default ToastMessage;


