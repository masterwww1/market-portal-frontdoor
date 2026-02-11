import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0a2540',
      light: '#42526e',
      dark: '#091a2e',
    },
    secondary: {
      main: '#635bff',
      light: '#0a2540',
      dark: '#0a2540',
    },
    background: {
      default: '#f6f9fc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0a2540',
      secondary: '#42526e',
    },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
});

export default theme;
