import { grommet, TextAreaProps, ThemeType } from 'grommet';
import { FormUp as FormUpIcon, FormDown as FormDownIcon } from 'grommet-icons';
import { deepMerge } from 'grommet/utils';
// f9f9fb
const theme/*: ThemeType */ = {
  accordion: {
    border: undefined,
    heading: {
      level: 6,
    },
    icons: {
      color: 'dark-3',
      collapse: FormDownIcon,
      expand: FormUpIcon
    }
  },
  button: {
    // color: 'blue'
  },
  list: {
    focus: {
      border: { color: 'transparent'}
    },
  },
  global: {
    focus: {
      border: { color: 'transparent'}
    },
    colors: {
      brand: '#de8626',

    },
    control: {
      // background: 'dark-3',
      border: {
        width: '2px',
        radius: '0',
        color: 'light-6'
      }
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
  textArea: {
    extend: (props: any) => {
      return {
        background: props.theme.dark
          ? props.theme.global.colors['dark-5']
          : props.theme.global.colors['light-1']
      }
    }
  },
  textInput: {
    extend: (props: any) => {
      return {
        background: props.theme.dark
          ? props.theme.global.colors['dark-5']
          : props.theme.global.colors['light-1']
      }
    }
  },
  formField: {
    border: {
      color: 'none',
    },
    label: {
      margin: {
        horizontal: '0',
      }
    },
    margin: {
      vertical: 'medium',
    },
    extend: () => {
      return {
        width: '100%'
      }
    }
  },
}

export default deepMerge(grommet, theme);


