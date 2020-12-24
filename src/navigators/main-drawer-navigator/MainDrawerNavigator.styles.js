import { styleCreator, convertHexToRgbA } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { fonts, spacing, colors, fontSizes } = ThemingStore.currentTheme;

export default styleCreator({
  DrawerNavigator_drawer: {
    width: '100%',
    backgroundColor: colors.background,
  },
  DrawerNavigator_itemStyle: {
    marginHorizontal: spacing,
    borderBottomWidth: 1,
    borderBottomColor: convertHexToRgbA(colors.primary, 20),
  },
  DrawerNavigator_labelStyle: {
    fontSize: fontSizes.medium,
    marginLeft: -spacing,
    color: colors.primary,
    ...fonts.regular,
  },
  DrawerNavigator_drawerIcon: {
    margin: 0,
  },
  DrawerNavigator_drawerIcon__lowerOpacity: {
    opacity: 0.5,
  },
});
