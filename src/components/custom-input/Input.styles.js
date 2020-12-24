import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { spacedWidth, colors, spacing } = ThemingStore.theme;

export default styleCreator({
  CustomInput_container: {
    marginBottom: hp('1.5%'),
    alignItems: 'center',
  },
  CustomInput_textInput: {
    width: spacedWidth,
    height: hp('6%'),
    marginBottom: 5,
  },
  CustomInput_extraSpacedWidthTextInput: {
    width: spacedWidth - spacing,
  },
  CustomInput_errorText: {
    color: colors.danger,
    marginLeft: 5,
  },
});
