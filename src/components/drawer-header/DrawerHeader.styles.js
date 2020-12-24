import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { spacing, colors, fontSizes, fonts } = ThemingStore.currentTheme;

export default styleCreator({
  DrawerHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('20%'),
  },
  DrawerHeader_closeIcon: {
    position: 'absolute',
    top: spacing / 2 - 10,
    left: spacing / 2,
  },
  DrawerHeader_loggedInAsText: {
    fontSize: fontSizes.small,
    ...fonts.regular,
    color: colors.primary,
  },
  DrawerHeader_nameText: {
    fontSize: fontSizes.medium,
    ...fonts.bold,
    color: colors.secondaryAccent,
    marginTop: 10,
  },
});
