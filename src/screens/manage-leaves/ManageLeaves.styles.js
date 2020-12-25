import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { fonts, colors, fontSizes } = ThemingStore.currentTheme;

export default styleCreator({
  ManageLeaves_title: {
    fontSize: fontSizes.small,
    color: colors.primary,
    ...fonts.regular,
  },
  ManageLeaves_description: {
    fontSize: fontSizes.tiny,
    color: colors.secondaryAccent,
    ...fonts.regular,
  },
  ManageLeaves_deleteReminderIcon: { opacity: 0.55, marginRight: -20 },
  ManageLeaves_noLeavesView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  ManageLeaves_noLeavesText: {
    textAlign: 'center',
    fontSize: fontSizes.small,
    ...fonts.regular,
  },
});
