import { styleCreator } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';

const { fonts, colors, fontSizes } = ThemingStore.currentTheme;

export default styleCreator({
  ManageLeaves_title: {
    fontSize: fontSizes.large,
    color: colors.primary,
    ...fonts.regular,
  },
  ManageLeaves_description: {
    fontSize: fontSizes.medium,
    color: colors.secondaryAccent,
    ...fonts.regular,
  },
  ManageLeaves_deleteReminderIcon: { opacity: 0.55 },
  ManageLeaves_noLeavesView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  ManageLeaves_noLeavesText: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: fontSizes.medium,
    ...fonts.regular,
  },
});
