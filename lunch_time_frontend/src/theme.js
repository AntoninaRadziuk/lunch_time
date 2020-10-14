import { createMuiTheme } from "@material-ui/core/styles";


const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#19A8AA",
        contrastText: "#fff",
      },
      secondary: {
        main: "#715AFC"
      },
      info: {
        main: "#19A8AA"
      }
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
      ].join(','),
    },
  });

  export default theme