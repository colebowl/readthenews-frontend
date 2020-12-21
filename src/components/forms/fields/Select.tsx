
import React from 'react';
import PropTypes from 'prop-types';
import { FormField, Select as GrommetSelect } from 'grommet';

interface Props {
  error?: string;
  helpText?: string;
  options: string[];
  infoText?: string;
  label?: string;
  name: string;
  onChange: (value: any) => any,
  required?: boolean;
  value?: string;
}

const Select: React.FC<Props> = (props) => {
  const {
    error,
    helpText,
    infoText,
    label,
    name,
    onChange,
    options,
    required,
    value
  } = props;

  return (
    <FormField
      info={infoText}
      help={helpText}
      label={required ? `${label} *` : label}
      error={error}
      required={required}
    >
      <GrommetSelect
        options={options}
        plain={false}
        name={name}
        value={value}
        valueKey={value}
        onChange={({ option }) => {console.log('option', option); onChange(option)}}
      />
    </FormField>
  );
};

Select.defaultProps = {
  error: undefined,
  helpText: undefined,
  infoText: undefined,
  label: undefined,
  required: false,
  value: '',
}

Select.propTypes = {
  error: PropTypes.string,
  helpText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  infoText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default Select;
