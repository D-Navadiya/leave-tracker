import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { fonts, colors } = ThemingStore.currentTheme;

export default styleCreator({
  ScreenHeader: {
    backgroundColor: colors.primaryAccent,
    height: hp('8%'),
    zIndex: 1,
  },
  ScreenHeader_title: {
    textAlign: 'center',
    color: colors.text,
    fontSize: 18,
    textTransform: 'uppercase',
    ...fonts.bold,
  },
});
