import { Menu } from 'grommet';
import React from 'react';
import i18n, { EnabledLocales } from '../../../i18n';

const ToggleLocale: React.FC = () => {
  const [selectedLocale, setLocale] = React.useState(i18n.language);

  const handleLocaleChange = (locale: EnabledLocales) => {
    if (locale === selectedLocale) {
      return;
    }

    setLocale(locale);
    i18n.changeLanguage(locale);
  };

  return (
    <Menu
      label={selectedLocale}
      items={[
        { label: 'English', onClick: () => handleLocaleChange('en') },
        { label: 'French', onClick: () => handleLocaleChange('fr') },
        { label: 'German', onClick: () => handleLocaleChange('de') },
      ]}
    />
  )
};

export default ToggleLocale;
