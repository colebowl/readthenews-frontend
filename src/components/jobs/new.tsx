import CompanyProfileForm from 'components/forms/CompanyProfile';
import React from 'react';

import Panel from '../layout/Panel';

const NewJobPosting = () => {
  return (
    <div>
      <h1>jobz!</h1>
        <Panel>
          <CompanyProfileForm />
        </Panel>

        <Panel>
          <CompanyProfileForm />
        </Panel>
    </div>
  );
};

export default NewJobPosting;
