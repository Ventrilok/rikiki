import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#038C65'
      },
      secondary: {
        main: '#F2CB05'
      },
      background: {
        default: '#fff'
      },
      error: {
        main: '#F22E3E'
      },
      text:
     {
       primary: 'rgb(0, 0, 0)'
     }
    },
    typography: {
      fontFamily:
       '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      body1: {
        fontSize: `${15 / 16}rem`
      }
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          'strong, b': {
            fontWeight: 'bold'
          }
        }
      }
    }
  })
)

export default theme
