import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { fonts, spacing, colors, fontSizes } = ThemingStore.currentTheme;

export default styleCreator({
  RadioField_container: {
    marginBottom: spacing / 2,
  },
  RadioField_title: {
    fontSize: fontSizes.medium,
    textAlign: 'center',
    color: colors.secondaryAccent,
    marginBottom: spacing / 2,
    ...fonts.bold,
  },
  RadioField_radioBtnLabel: {
    fontSize: fontSizes.small,
    color: colors.primary,
    ...fonts.regular,
  },
});
