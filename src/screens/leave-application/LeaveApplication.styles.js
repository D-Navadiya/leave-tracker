import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { spacing, fontSizes } = ThemingStore.currentTheme;

export default styleCreator({
  LeaveApplication_viewWrapper: {
    marginVertical: spacing,
    height: hp('118%'),
  },
  LeaveApplication_fields: {
    marginBottom: spacing,
  },
  LeaveApplication_btnLabel: { fontSize: fontSizes.small },
});
