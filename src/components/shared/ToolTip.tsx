import React from 'react';
import { Box, Text } from 'grommet';
import { Tip } from 'grommet/components/Tip';

const TipContent = ({ message }: { message: string }) => (
  <Box direction="row" align="center">
    <svg viewBox="0 0 22 22" version="1.1" width="22px" height="22px">
      <polygon
        fill="grey"
        points="6 2 18 12 6 22"
        transform="matrix(-1 0 0 1 30 0)"
      />
    </svg>
    <Box background="dark-3" direction="row" pad="small" round="xsmall">
      <Text color="white">{message}</Text>
    </Box>
  </Box>
);

type Props = {
  message: string;
}

const ToopTip: React.FC<Props> = (props) => {
  return (
    <Tip
      dropProps={{ align: { left: 'right' } }}
      content={<TipContent message={props.message} />}
      plain
    >
      {props.children}
    </Tip>
  );
}

export default ToopTip;
