import { InjectedFormikProps, withFormik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { Box, Grid } from 'grommet';

import TextInput from './fields/TextInput';
import TextArea from './fields/TextArea';
import FileUploader from './fields/FileUploader';

interface FormValues {
  description: string;
  name: string;
  websiteUrl: string;
  keyValuesUrl: string;
  logoUrl: string;
  officeLocation: string;
  missionVisionValues: string;
  whyShouldCandidateWorkThere: string;
}

interface FormProps {
  login?: string;
}

const InnerForm: React.SFC<InjectedFormikProps<FormProps, FormValues>> = (
  props,
) => (
    <form onSubmit={props.handleSubmit}>
      <TextInput
        label="Company Name"
        error={props.errors.name}
        onChange={props.handleChange}
        name="name"
        required
        value={props.values.name}
      />

      <TextInput
        error={props.errors.websiteUrl}
        label="Company Website"
        onChange={props.handleChange}
        name="websiteUrl"
        required
        value={props.values.websiteUrl}
      />

      <TextArea
        error={props.errors.missionVisionValues}
        label="What are your company's mission, vision and values?"
        onChange={props.handleChange}
        name="missionVisionValues"
        required
        value={props.values.missionVisionValues}
      />

      <TextArea
        error={props.errors.whyShouldCandidateWorkThere}
        label="Why should a candidate want to work at your company?"
        onChange={props.handleChange}
        name="whyShouldCandidateWorkThere"
        required
        value={props.values.whyShouldCandidateWorkThere}
      />

      <TextArea
        error={props.errors.description}
        label="Company Description?"
        onChange={props.handleChange}
        name="description"
        required
        value={props.values.description}
      />

      <TextInput
        error={props.errors.officeLocation}
        label="Office Location"
        onChange={props.handleChange}
        name="officeLocation"
        value={props.values.officeLocation}
      />

      <TextInput
        error={props.errors.keyValuesUrl}
        label="keyvalues.com profile url"
        onChange={props.handleChange}
        name="keyValuesUrl"
        value={props.values.keyValuesUrl}
      />

      <FileUploader
        error={props.errors.logoUrl}
        label="Company Logo"
        onChange={props.handleChange}
        name="logoUrl"
        value={props.values.logoUrl}
      />
    </form>
  );

const CompanyProfileForm = withFormik<FormProps, FormValues>({
  // mapPropsToValues: () => ({ size: '', employeeId: '', name: '', login: '' }),
  validationSchema: Yup.object().shape({
    login: Yup.string()
      .max(16, 'Please input 16 characters or less')
      .required('Please input login name'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(
      () => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      },
      1000,
    );
  },
})(InnerForm);

export default CompanyProfileForm;
