import React from 'react';
import { Formik, } from 'formik';
import { Box, Button, FormField, RadioButton, Text, TextInput } from 'grommet';
import * as Yup from 'yup';
import Avatar from '../../shared/Avatar';
import Spinner from '../../shared/Spinner';
import theme from '../../../theme';

const { colors } = theme.global;
console.log('colors:', colors)

export type FormFields = {
  name: string;
  alias: string;
  color: string;
  iconUrl?: string;
};

type Props = {
  icons: { [key: string]: string };
  onSubmit: (fields: FormFields) => void;
  existingAliases: string[]
  values?: FormFields;
}

const SignupSchema = (existingAliases: string[]) => Yup.object().shape({
  name: Yup.string()
    .min(1, 'Name must be longer')
    .max(50, 'Name must be under 50 characters')
    .required('Required'),
  alias: Yup.string()
    .matches(new RegExp(/^[a-z0-9]+$/i), 'Address must only include numbers and letters')
    .notOneOf(existingAliases, 'You already have already created this alias')
    .min(4, 'Email alias must must be at least 4 characters')
    .max(16, 'Email alias must be no more than 16 characters ')
    .required('Required'),
});


const EditSubscription: React.FC<Props> = (props) => {
  const { existingAliases, values, icons } = props;
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={() => SignupSchema(existingAliases)}
      initialValues={values || {} as FormFields}
      validateOnBlur={true}
      validateOnChange={submitted}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        props.onSubmit({
          ...values,
          alias: values.alias.toLowerCase()
        })
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
                  {Object.keys(colors || {}).length ? (
                    <FormField
                      margin="none"
                      label={<Text size="xsmall">Color</Text>}
                      error={errors.name}>
                      <Box direction="row" margin={{ bottom: 'medium' }}>
                        {Object.keys(colors).map((key: string) => typeof colors[key] === 'string' && (
                          <Box key={key}
                            hoverIndicator="brand"
                            round="xlarge"
                            pad="xsmall"
                            onClick={() => setFieldValue('color', colors[key])}
                          >
                            <Avatar
                              // name={key}
                              border={{color: values.color === colors[key] ? 'brand' : 'inherit', size: '4px'}}
                              color={colors[key] as string}
                              size="small"
                              margin={{ right: '0px' }}
                            />
                            {/* <RadioButton name="" value={colors[key] as string} checked={values.iconUrl === colors[key]} onChange={(e) => { */}
                          </Box>
                        ))}
                      </Box>
                    </FormField>
                  ) : null}

                  <FormField
                    margin="none"
                    label={<Text size="xsmall">Name</Text>}
                    error={errors.name}>
                    <TextInput
                      required
                      name="name"
                      size="xsmall"
                      value={values.name || ""}
                      onChange={handleChange}
                    />
                  </FormField>
                  <FormField
                    margin="none"
                    label={<Text size="xsmall">Traylias</Text>}
                    error={errors.alias}>
                    <Box direction="row" align="center">
                      <Box width="40%">
                        <TextInput
                          size="xsmall"
                          name="alias"
                          value={values.alias || ""}
                          onChange={handleChange}
                          maxLength={12}
                        />
                      </Box>
                      <Text margin={{ left: 'xsmall', right: "xlarge" }}>@cole.thru.email</Text>
                    </Box>
                  </FormField>

                  <Box
                    tag="footer"
                    margin={{ top: "small" }}
                    direction="row"
                  // justify="between"
                  >
                    <Button size="small" type="submit" primary label="Create" />
                  </Box>
                </>
              )}
          </>
        </form>
      )}
    </Formik>
  );
}

EditSubscription.defaultProps = {
  icons: {}
};

EditSubscription.propTypes = {
};

export default EditSubscription;
