import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../fonts';
import colors from './ThemeColors';

const customRegularTheme = {
  spacing: wp('5%'),
  // spacedWidth calc -> total width - spacing x 2
  spacedWidth: wp('90%'),
  // roundness: hp('5%'),
  fontSizes: {
    tiny: 14,
    small: 18,
    medium: 22,
    large: 28,
    huge: 34,
  },
  ...fonts,
  dark: false,
  ...colors,
};

export default customRegularTheme;
