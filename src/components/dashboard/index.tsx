import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

interface Props { }

const Dashboard: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <Trans i18nKey="components.dashboard.index.dummyText"><h1>DASHBOARD!</h1></Trans>
      <h1>{t('DASHBOARD!')}</h1>
    </>
  );
};
export default Dashboard;
