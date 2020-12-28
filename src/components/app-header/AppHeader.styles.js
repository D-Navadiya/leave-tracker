import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { colors, fonts, fontSizes } = ThemingStore.currentTheme;

export default styleCreator({
  AppHeader: {
    backgroundColor: colors.primary,
  },
  AppHeader_dashboardScreen: { backgroundColor: colors.primary },
  AppHeader_title: {
    textAlign: 'center',
    color: colors.textAccent,
    ...fonts.regular,
    fontSize: fontSizes.huge,
  },
  AppHeader_imageLogo: {
    height: 75,
    width: 170,
    position: 'absolute',
    left: '32%',
  },
});
