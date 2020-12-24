import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const {
  colors,
  fonts,
  fontSizes,
  spacing,
  spacedWidth,
} = ThemingStore.currentTheme;

export default styleCreator({
  Dashboard_viewWrapper: {
    marginVertical: spacing,
  },
  Dashboard_divider: {
    width: spacedWidth,
  },
  Dashboard_infoView: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  Dashboard_titleText: {
    textAlign: 'center',
    fontSize: fontSizes.large,
    marginBottom: spacing,
    ...fonts.regular,
    color: colors.primary,
  },
  Dashboard_valueText: {
    textAlign: 'center',
    fontSize: fontSizes.huge,
    ...fonts.bold,
    color: colors.secondary,
  },
});
