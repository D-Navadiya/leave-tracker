import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { colors } = ThemingStore.currentTheme;

export default styleCreator({
  Loader_modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: colors.loaderModalBg,
  },
  Loader_activityIndicatorWrapper: {
    backgroundColor: colors.surface,
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
