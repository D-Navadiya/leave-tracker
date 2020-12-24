import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { fontSizes } = ThemingStore.theme;

export default styleCreator({
  Register_formWrapper: { marginBottom: hp('7%') },
  Register_inputFieldsWrapper: {
    marginBottom: hp('2.5%'),
  },
  Register_btnLabel: { fontSize: fontSizes.small },
});
