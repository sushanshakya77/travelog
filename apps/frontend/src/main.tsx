import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './app/app';
import './styles.css';
import { SnackbarProvider } from 'notistack';
import 'simplebar/dist/simplebar.min.css';

const theme = createTheme({
  palette: {
    background: {
      default: '#def2f1',
    },
    // primary: {
    //   main: '#000000',
    // },
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  },
});

const queryClient = new QueryClient();

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
