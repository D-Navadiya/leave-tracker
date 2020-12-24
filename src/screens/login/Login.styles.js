import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { fontSizes } = ThemingStore.theme;

export default styleCreator({
  Login_loginFormWrapper: { marginBottom: hp('7%') },
  Login_inputFieldsWrapper: {
    marginBottom: hp('2.5%'),
  },
  Login_btnLabel: { fontSize: fontSizes.small },
});
