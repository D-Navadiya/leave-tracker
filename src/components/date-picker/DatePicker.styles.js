import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const {
  fonts,
  spacing,
  colors,
  fontSizes,
  spacedWidth,
} = ThemingStore.currentTheme;

export default styleCreator({
  DatePicker_container: {
    marginBottom: spacing,
  },
  DatePicker_label: {
    fontSize: fontSizes.medium,
    textAlign: 'center',
    color: colors.secondaryAccent,
    ...fonts.regular,
    marginBottom: spacing,
  },
  DatePicker_pickerWrapper: {
    alignItems: 'center',
  },
  DatePicker_picker: {
    width: spacedWidth - spacing,
  },
});
