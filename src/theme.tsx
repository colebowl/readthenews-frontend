import { grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

export default deepMerge(grommet, {
  button: {
    color: 'blue'
  },
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
});
