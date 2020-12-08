import React from 'react';
import { Box, Text } from 'grommet';
import { BackgroundType, ColorType, MarginType } from 'grommet/utils';

type Props = {
  background?: BackgroundType;
  label: string;
  textColor?: ColorType;
  margin?: MarginType;
}

const Pill: React.FC<Props> = (props) => {
  const { background, textColor, label, margin } = props;
  return (
    <Box elevation="xsmall" background={background} round align="center" margin={margin} pad={{ horizontal: 'small' }}>
      <Text size="xsmall" color={textColor} weight="bold">{label}</Text>
    </Box>
  );
}

Pill.defaultProps = {
  background: 'brand',
  textColor: 'white'
}

export default Pill;
