import { styleCreator, convertHexToRgbA } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { colors } = ThemingStore.currentTheme;

export default styleCreator({
  CustomDivider: {
    backgroundColor: convertHexToRgbA(colors.primary, 80),
  },
});
