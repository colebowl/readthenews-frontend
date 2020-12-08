import React from 'react';
import PropTypes from 'prop-types';
import { Button as GrommetButton } from 'grommet';
import { useTranslation } from '../translation';

interface Props {
  children?: any;
  icon?: JSX.Element;
  label?: string;
  i18nKey: string;
  onClick: () => void;
}

const Button: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { i18nKey, children, icon, onClick } = props;

  if (!children && !i18nKey) {
    throw new Error('Must have children or a translation key');
  }
  return (
    <GrommetButton
      primary
      icon={icon}
      onClick={onClick}
      label={t(i18nKey)}
    />
  )
};

Button.defaultProps = {
  icon: undefined,
};

Button.propTypes = {
  i18nKey: PropTypes.string.isRequired,
  icon: PropTypes.element,
  onClick: PropTypes.func.isRequired,
};

export default Button;
