import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { spacing, fontSizes, colors } = ThemingStore.theme;

export default styleCreator({
  AuthWrapper_container: {
    alignItems: 'center',
    marginVertical: spacing,
    height: hp('115%'),
  },
  AuthWrapper_flexedContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  AuthWrapper_logoWrapper: { minHeight: 100 },
  AuthWrapper_logo: { height: hp('20%'), width: wp('25%') },
  AuthWrapper_enlargedLogo: { height: hp('40%'), width: wp('40%') },
  AuthWrapper_regLoginNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  AuthWrapper_regLoginNavigationText: {
    fontSize: fontSizes.medium,
    color: colors.secondaryAccent,
  },
  AuthWrapper_regLoginNavLink: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.primary,
    color: colors.primary,
  },
});
