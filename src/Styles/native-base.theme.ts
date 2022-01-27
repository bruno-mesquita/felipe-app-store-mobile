import { extendTheme } from 'native-base';

export default extendTheme({
  components: {
    Input: {
      defaultProps: {
        size: 'md',
        variant: 'primary',
      },
      variants: {
        primary: {
          bg: '#770202',
          color: '#fff',
          selectionColor: '#fff',
          placeholderTextColor: '#C4C4C4',
        },
      },
    },
    Button: {
      baseStyle: {
        rounded: '8px',
      },
      defaultProps: {
        py: '11px',
        _text: {
          fontSize: 'md',
          fontWeight: 400,
        },
        _pressed: { bg: '#808080' },
      },
      variants: {
        solid: {
          bg: '#fff',
          _text: {
            color: '#000',
          },
        },
        inverted: {
          bg: '#9E0404',
          _text: {
            color: '#fff',
          },
        },
      },
    },
  },
  fontConfig: {
    Roboto: {
      100: 'Roboto_100Thin',
      200: 'Roboto_100Thin',
      300: 'Roboto_300Light',
      400: 'Roboto_400Regular',
      500: 'Roboto_500Medium',
      600: 'Roboto_500Medium',
      700: 'Roboto_700Bold',
      800: 'Roboto_700Bold',
      900: 'Roboto_900Black',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
    mono: 'Roboto',
  },
});
