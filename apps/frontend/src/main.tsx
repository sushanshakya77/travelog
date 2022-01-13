import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RecoilRoot } from 'recoil';
import App from './app/app';
import './styles.css';

const themeLight = createTheme({
  palette: {
    background: {
      default: '#def2f1',
    },
  },
});

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <ThemeProvider theme={themeLight}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </RecoilRoot>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
