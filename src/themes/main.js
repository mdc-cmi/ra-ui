import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: "#455a64"
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#455a64"
      }
    },
    MuiToolbar: {
      root: {
        "& form": {
          paddingTop: 24,
        },
        "& .filter-field": {
          height: 48
        }
      }
    },
    MuiTableRow: {
      root: {
        height: 48
      }
    },
    MuiMenu: {
      paper: {
        maxHeight: "100%"
      }
    }
  },
  typography: {
    useNextVariants: true,
  },
});
