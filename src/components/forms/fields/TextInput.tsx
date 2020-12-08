import React from 'react';
import PropTypes from 'prop-types';
import { FormField, TextInput as GrommetTextInput } from 'grommet';

interface Props {
  error?: string;
  helpText?: string;
  infoText?: string;
  label?: string;
  name: string;
  onChange: (value: any) => any,
  required?: boolean;
  value?: number | string;
}

const TextInput: React.FC<Props> = (props) => {
  const {
    error,
    helpText,
    infoText,
    label,
    name,
    onChange,
    required,
    value
  } = props;

  return (
    <>
      <FormField
        info={infoText}
        help={helpText}
        label={required ? `${label} *` : label}
        error={error}
        required={required}
      >
        <GrommetTextInput
          plain={false}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      </FormField>
    </>
  );
};

TextInput.defaultProps = {
  error: undefined,
  helpText: undefined,
  infoText: undefined,
  label: undefined,
  required: false,
  value: '',
}

TextInput.propTypes = {
  error: PropTypes.string,
  helpText: PropTypes.string,
  infoText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default TextInput;
