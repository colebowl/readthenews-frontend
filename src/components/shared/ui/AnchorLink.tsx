// Thanks to https://github.com/grommet/grommet/issues/3572#issuecomment-575887940
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Anchor, AnchorProps } from 'grommet/components/Anchor';
import { Link } from 'react-router-dom';

const AnchorLink: React.FC<AnchorLinkProps> = props => {
  // return <Anchor as={Link} {...props} />
  return <Anchor
    as={({ colorProp, hasIcon, hasLabel, focus, ...p }) => <Link {...p} />}
    {...props}
  />
}

export type AnchorLinkProps = { to: string; }
  // & LinkProps //disabling this as it messes up the color prop
  & AnchorProps
  & Omit<JSX.IntrinsicElements['a'], 'color'>

export default AnchorLink;
