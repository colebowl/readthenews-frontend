import { InjectedFormikProps, withFormik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { FormField, TextInput, Select, Box, Button } from 'grommet';

interface FormValues {
  login: string;
  employeeId: string;
  name: string;
  size: string;
}

interface FormProps {
  login?: string;
}

const InnerForm: React.SFC<InjectedFormikProps<FormProps, FormValues>> = (
  props,
) => (
    <form onSubmit={props.handleSubmit}>
      <FormField label="Name" error={props.errors.name}>
        <TextInput
          name="name"
          value={props.values.name || ""}
          onChange={props.handleChange}
        />
      </FormField>
      <FormField label="Employee ID" error={props.errors.employeeId}>
        <TextInput
          name="employeeId"
          value={props.values.employeeId || ""}
          onChange={props.handleChange}
        />
      </FormField>
      <FormField label="Size" error={props.errors.size}>
        <Select
          name="size"
          options={["small", "medium", "large"]}
          value={props.values.size || ""}
          onChange={event => props.setFieldValue("size", event.value)}
        />
      </FormField>

      <Box
        tag="footer"
        margin={{ top: "medium" }}
        direction="row"
        justify="between"
      >
        <Button label="Cancel" disabled={props.isSubmitting}/>
        <Button type="submit" primary label="Create" disabled={props.isSubmitting} />
      </Box>


    </form>
  );

const UserSearchForm = withFormik<FormProps, FormValues>({
  mapPropsToValues: () => ({ size: '', employeeId: '', name: '', login: '' }),
  validationSchema: Yup.object().shape({
    login: Yup.string()
      .max(16, 'Please input 16 characters or less')
      .required('Please input login name'),
  },
  ),
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

export default UserSearchForm;
