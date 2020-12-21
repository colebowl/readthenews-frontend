import React from 'react';
import { Box, Heading, Text } from 'grommet';

const NoEmailsMessage: React.FC = () => {
  return (
    <Box
      flex
      align="center"
      justify="center"
      margin={{ vertical: 'xlarge', horizontal: 'large' }}
      pad="small"
      alignContent="center"
      background="light-2"
    >
      <Heading level="4" margin="none">Waiting for emails</Heading>
      <Text size="small" margin="none">There are no emails in this tray</Text>
    </Box>
  );
}

export default NoEmailsMessage;
