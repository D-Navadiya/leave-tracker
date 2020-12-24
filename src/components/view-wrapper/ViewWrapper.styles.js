import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { spacing, colors } = ThemingStore.currentTheme;

export default styleCreator({
  ViewWrapper: {
    marginHorizontal: spacing,
    backgroundColor: colors.background,
  },
  ViewWrapper_halfSpaced: {
    marginHorizontal: spacing / 2,
  },
  ViewWrapper_flexed: {
    flex: 1,
  },
});
