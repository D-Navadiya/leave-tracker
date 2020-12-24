import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { colors, spacedWidth } = ThemingStore.currentTheme;

export default styleCreator({
  GenericButton_label: { fontSize: 15 },
  GenericButton_label__primaryInverted: {
    color: colors.text,
  },
  GenericButton_label__secondary: {
    color: colors.text,
  },
  GenericButton_contentStyle: { height: '100%' },
  GenericButton_button: {
    width: spacedWidth,
    height: hp('6.1%'),
    borderRadius: hp('5%'),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  GenericButton_button__primaryInverted: {
    backgroundColor: colors.surface,
  },
  GenericButton_button__secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  GenericButton_button__secondaryInverted: {
    borderWidth: 1,
    borderColor: colors.accent,
  },
});
