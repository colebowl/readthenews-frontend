import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, TextProps } from 'grommet';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';

import ToolTip from './ToolTip';
type Props = {
  text: string;
  textProps?: TextProps;
}

const HoverableBox = styled(Box)`
  &:hover {
    cursor: pointer
  }
`;

const CopyableText: React.FC<Props> = ({ text, textProps }) => {
  const [copied, setCopied] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 5000)
  }, [copied])

  return (
    <Box onMouseLeave={() => setCopied(false)}>
      <ToolTip message={copied ? 'copied!' : 'copy to clipboard'}>
        <HoverableBox>
          <CopyToClipboard text={text}
            onCopy={() => setCopied(true)}>
            <Text {...textProps} >
              {text}
            </Text>
          </CopyToClipboard>
        </HoverableBox>
      </ToolTip>
    </Box>
  );
}

export default CopyableText;
