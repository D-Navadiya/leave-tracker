import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { styleCreator } from 'src/helpers';

export default styleCreator({
  CustomDrawerContent_logoutButton: {
    width: wp('30%'),
    marginTop: hp('40%'),
  },
});
