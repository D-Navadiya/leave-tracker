import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { colors, fonts, fontSizes } = ThemingStore.currentTheme;

export default styleCreator({
  AppHeader: {
    backgroundColor: colors.primaryAccent,
  },
  AppHeader_dashboardScreen: { backgroundColor: colors.primaryAccent },
  AppHeader_title: {
    textAlign: 'center',
    color: colors.secondaryAccent,
    ...fonts.regular,
    fontSize: fontSizes.medium,
  },
  AppHeader_imageLogo: {
    height: 75,
    width: 170,
    position: 'absolute',
    left: '32%',
  },
});
