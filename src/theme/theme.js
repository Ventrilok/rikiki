import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: '#038C65',
      },
      secondary: {
        main: '#0A6A8C',
      },
      error: {
        main: '#8C112E',
      },
      warning: {
        main: '#F2CB05',
      },
      info: {
        main: '#F22E3E',
      },
      sucess: {
        main: '#F22E3E',
      },
      background: {
        default: '#ffffff',
      },
    },
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      body1: {
        fontSize: `${15 / 16}rem`,
      },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          'strong, b': {
            fontWeight: 'bold',
          },
        },
      },
    },
  }),
);

export default theme;
