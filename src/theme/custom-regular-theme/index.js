import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fonts from '../fonts';
import colors from './ThemeColors';

const customRegularTheme = {
  spacing: wp('5%'),
  // spacedWidth calc -> total width - spacing x 2
  spacedWidth: wp('90%'),
  // roundness: hp('5%'),
  fontSizes: {
    tiny: hp('1%'),
    small: hp('1.5%'),
    medium: hp('2%'),
    large: hp('2.5%'),
    huge: hp('3%'),
    humongous: hp('4%'),
  },
  iconSizes: {
    small: hp('3.5%'),
    medium: hp('4%'),
    large: hp('4.5%'),
    huge: hp('5.5%'),
  },
  ...fonts,
  dark: false,
  ...colors,
};

export default customRegularTheme;
