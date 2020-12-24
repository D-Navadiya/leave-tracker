import { convertHexToRgbA } from 'src/helpers';
import CompColors from '../CompColors';

const baseColors = {
  primary: '#023d8a',
  primaryAccent: '#4199df',
  secondary: '#8a4f02',
  secondaryAccent: '#632900',
  text: '#000000',
  background: '#caf0f8',
  textAccent: '#fff',
  // disabled
  placeholder: convertHexToRgbA('#023d8a', 50),
  // backdrop,
  danger: 'red',
};

export default {
  colors: {
    ...baseColors,
    ...CompColors,
  },
};
