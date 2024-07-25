import {
  createTheme,
  responsiveFontSizes
} from '@mui/material/styles';

const font = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',');

let theme = createTheme({
  // palette: {
  //   primary: { main: '#1d2031' },
  //   secondary: { main: '#dc0250' },
  //   error: { main: '#6E353A' },
  //   warning: { main: '#F5EE9E' }
  //   info: { main: '#568BFF' },
  //   success: { main: '#00B389' },
  //   background: { default: '#FDFFFC' }
  // },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => ({
        body: {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'grey',
            borderRadius: '24px',
          },
        },
        div: {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'grey',
            borderRadius: '24px',
          },
        },
        input: {
          height: 10,
        }
      }),
    },
  },
  breakpoints: {
    values: { xs: 300, sm: 800, md: 1000, lg: 1200, xl: 1536, }
  },
  typography: {
    fontFamily: font,
    h1: { fontSize: 69 },
    h2: { fontSize: 57 },
    h3: { fontSize: 48 },
    h4: { fontSize: 40 },
    h5: { fontSize: 33 },
    h6: { fontSize: 28 },
    subtitle1: { fontSize: 23 },
    subtitle2: { fontSize: 19 },
    body1: { fontSize: 19 },
    body2: { fontSize: 16 },
  },
});

theme = responsiveFontSizes(theme);

theme.typography.h6 = {
  fontSize: '28px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
  },
};

export default theme;