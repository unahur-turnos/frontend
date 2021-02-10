import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import { Alert } from '@material-ui/lab';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <CssBaseline />
      <RecoilRoot>
        <ErrorBoundary
          fallback={<Alert severity="error">Algo se rompió feo :(</Alert>}
        >
          <App />
        </ErrorBoundary>
      </RecoilRoot>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
