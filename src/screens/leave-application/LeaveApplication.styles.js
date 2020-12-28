import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { spacing } = ThemingStore.currentTheme;

export default styleCreator({
  LeaveApplication_viewWrapper: {
    marginVertical: spacing,
    height: hp('115%'),
  },
  LeaveApplication_fields: {
    marginBottom: spacing,
  },
});
