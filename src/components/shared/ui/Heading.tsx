import React from 'react';
import PropTypes from 'prop-types';
import { Heading as GrommetHeading } from 'grommet';
import { useTranslation } from '../translation';

interface Props {
  i18nKey: string
  i18nValues?: { [key: string]: string };
  level?: number;
}

const Button: React.FC<Props> = (props) => {
  const { children, i18nKey, i18nValues, level } = props;
  const { t } = useTranslation();
  return (
    <GrommetHeading level={level as any}>
      {t(i18nKey, i18nValues)}
    </GrommetHeading>
  )
};

Button.defaultProps = {
  level: 3,
  // i18nValues: {},
};

Button.propTypes = {
  i18nKey: PropTypes.string.isRequired,
  // i18nValues: PropTypes.objectOf(PropTypes.string),
  level: PropTypes.number,
};

export default Button;
