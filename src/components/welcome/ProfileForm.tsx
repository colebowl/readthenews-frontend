import React from 'react';
import { Formik } from 'formik';
import { Box, FormField, Text, Button, TextInput, CheckBox, Anchor } from 'grommet';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';

import { onboardingSetUserProfile } from '../../graphql/mutations';
import Spinner from '../shared/Spinner';

export type FormFields = {
  name: string;
  subdomain: string;
  agreeToTerms: boolean;
}

type Props = {
  values?: FormFields;
  onSubmit: (values: FormFields) => void;
}


const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Name must be longer')
    .max(50, 'Name must be under 50 characters')
    .required('Required'),
  subdomain: Yup.string()
    .matches(new RegExp(/^[a-z]+$/i), 'Subdomain must only include letters')
    .min(4, 'Subdomain alias must must be at least 4 characters')
    .max(16, 'Subdomain alias must be no more than 16 characters ')
    .required('Required'),
  agreeToTerms: Yup.bool().equals([true], 'You must agree to the terms and conditions').required()
});

const ProfileForm: React.FC<Props> = (props) => {
  const { values } = props
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [onProfileSubmit] = useMutation(onboardingSetUserProfile);
  return (
    <Formik
      enableReinitialize={true}
      validationSchema={ProfileSchema}
      initialValues={values || {} as FormFields}
      validateOnBlur={true}
      validateOnChange={submitted}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        try {
          setSubmitting(true);
          await onProfileSubmit({ variables: { input: values } });
          props.onSubmit(values);
        } catch (error) {
          setFieldError('subdomain', error.message)
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting
      }) => (
        <form
          onSubmit={event => {
            event.preventDefault();
            setSubmitted(true)
            handleSubmit();
          }}
        >
          <>
            {isSubmitting ? (
              <Box fill align="center" justify="center">
                <Spinner />
              </Box>
            ) : (
                <>
                  <FormField
                    margin="none"
                    label={<Text size="xsmall">Name</Text>}
                    error={errors.name}>
                    <TextInput
                      required
                      name="name"
                      value={values.name || ""}
                      onChange={handleChange}
                    />
                  </FormField>
                  <FormField
                    label={<Text size="xsmall">Subdomain</Text>}
                    error={errors.subdomain}>
                    <Box direction="row" align="center">
                      <Text margin={{ left: 'xsmall', right: "xsmall" }}>alias@</Text>
                      <Box width="40%">
                        <TextInput
                          name="subdomain"
                          value={values.subdomain || ""}
                          onChange={handleChange}
                          maxLength={12}
                        />
                      </Box>
                      <Text margin={{ left: 'xsmall', right: "xlarge" }}>.thru.email</Text>
                    </Box>
                  </FormField>

                  <Box background="light-3" pad="small">
                    <Text size="small">Once you choose your subdomain, you will not be able to change it. Choose wisely!</Text>
                  </Box>

                  <Box margin={{ vertical: "medium" }}>
                    <CheckBox
                      checked={values.agreeToTerms}
                      label={<Text margin={{ left: 'none' }}>I agree to the <Anchor target="_blank" href="https://sendthru.co/terms">terms and conditions</Anchor>.</Text>}
                      onChange={(event: any) => setFieldValue('agreeToTerms', event.target.checked ? true : false)}
                    />
                    {errors.agreeToTerms && <Text margin={{ top: 'medium' }} color="red">{errors.agreeToTerms}</Text>}
                  </Box>

                  <Box
                    tag="footer"
                    margin={{ top: "small" }}
                    direction="row"
                    justify="end"
                  >
                    <Button disabled={isSubmitting || Object.keys(errors).length > 0} size="small" type="submit" primary label="Continue" />
                  </Box>
                </>
              )}
          </>
        </form>
      )}
    </Formik>
  );
}

ProfileForm.defaultProps = {

};

ProfileForm.propTypes = {

};

export default ProfileForm;
