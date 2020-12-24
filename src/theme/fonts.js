import { configureFonts } from 'react-native-paper';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'PTSans-Regular',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'PTSans-Bold',
      fontWeight: 'normal',
    },
    italic: {
      fontFamily: 'PTSans-Italic',
      fontWeight: 'normal',
    },
    boldItalic: {
      fontFamily: 'PTSans-BoldItalic',
      fontWeight: 'normal',
    },
  },
};

export default { fonts: configureFonts(fontConfig) };
