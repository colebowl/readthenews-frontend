import Dropzone from 'react-dropzone-uploader';
import React from 'react';
import PropTypes from 'prop-types';
import 'react-dropzone-uploader/dist/styles.css';
import { FormField, ThemeContext } from 'grommet';

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


const FileUploader: React.FC<Props> = (props) => {
  // specify upload params and url for your files
  const getUploadParams = () => ({
    url: 'https://httpbin.org/post'
  });

  // called every time a file's `status` changes
  const handleChangeStatus = (data: any, status: any) => {
    const { meta, file } = data;
    console.log(status, meta, file)
  }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files: any, allFiles: any) => {
    console.log(files.map((f: any) => f.meta))
    allFiles.forEach((f: any) => f.remove())
  }

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
    <ThemeContext.Extend
      value={{
        formField: {
          border: {
            color: "none"
          },
          label: {
            margin: {
              bottom: "small"
            }
          },
          margin: {
            top: "medium",
            bottom: "medium"
          }
        }
      }}
    >
      <FormField
        info={infoText}
        help={helpText}
        label={required ? `${label} *` : label}
        error={error}
        required={required}
      >
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          multiple={false}
          accept="image/*"
        />
      </FormField>
    </ThemeContext.Extend>
  );
};

FileUploader.defaultProps = {
  error: undefined,
  helpText: undefined,
  infoText: undefined,
  label: undefined,
  required: false,
  value: '',
}

FileUploader.propTypes = {
  error: PropTypes.string,
  helpText: PropTypes.string,
  infoText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default FileUploader;
