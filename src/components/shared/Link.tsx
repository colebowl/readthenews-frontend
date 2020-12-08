import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Anchor } from 'grommet';

import Trans from './translation';

interface Props {
  children: any;
  i18n?: string;
  to: string;
}

const Link: React.FC<Props> = (props) => {
  const { children, i18n, to } = props;
  const history = useHistory();
  const { t } = useTranslation();


  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    history.push(to);
  }

  return (
    <Anchor href={to} onClick={handleClick}>
      <Trans t={t} i18nKey={i18n}>{children}</Trans>
    </Anchor>
  )
}

Link.defaultProps = {
  i18n: undefined,
};

Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  i18n: PropTypes.string,
  to: PropTypes.string.isRequired,
};

export default Link;
