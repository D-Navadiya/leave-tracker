import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

import CustomRegularTheme from 'src/theme/custom-regular-theme';
import { themeMerger } from 'src/helpers';

class ThemingStore {
  constructor() {
    this.combinedRegularTheme = {};
    this.currentTheme = {};
    this.init();
  }

  init = () => {
    const regularTheme = themeMerger(
      PaperDefaultTheme,
      NavigationDefaultTheme,
      CustomRegularTheme,
    );
    this.setCombinedRegularTheme(regularTheme);
    // set currently selected theme
    this.currentTheme = regularTheme;
  };

  setCombinedRegularTheme = (theme) => {
    this.combinedRegularTheme = theme;
  };

  setCombinedDarkTheme = (theme) => {
    this.combinedDarkTheme = theme;
  };

  get theme() {
    return this.currentTheme;
  }
}

const instance = new ThemingStore();
export default instance;
