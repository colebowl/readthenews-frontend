import React from 'react';
import { Text, Avatar as GAvatar, AvatarProps, BoxProps } from 'grommet';

import { getInitialsFromWords } from '../../shared/string';
import { randomProperty } from '../../shared/object';

type CompiledAvatarProps = BoxProps & AvatarProps & JSX.IntrinsicElements['div']

interface Props extends CompiledAvatarProps {
  url?: string;
  name?: string;
  color?: string;
}

const Avatar: React.FC<Props> = (props) => {
  const { name, url, color, ...restProps } = props;
  const initials = name && getInitialsFromWords(name, 2);

  return (
    <GAvatar
      margin={{ right: 'xsmall' }}
      size="small"
      {...restProps}
      background={color || (url ? undefined : 'light-3')}
      src={url}
    >
      {(name && !url) && <Text size={props.size || "small"}>{initials}</Text>}
    </GAvatar>
  );
}

Avatar.defaultProps = {

};

Avatar.propTypes = {

};

export default Avatar;
