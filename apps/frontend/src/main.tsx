import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './app/app';
import './styles.css';

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
    fontFamily: 'Poppins, sans-serif',
  },
});

const queryClient = new QueryClient();

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
