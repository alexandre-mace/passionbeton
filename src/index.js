import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0001FC',
        },
    },
});

// if ("serviceWorker" in navigator) {
//     navigator.serviceWorker
//         .register(process.env.PUBLIC_URL + "/firebase-messaging-sw.js")
//         .then(function(registration) {
//             console.log("Registration successful, scope is:", registration.scope);
//         })
//         .catch(function(err) {
//             console.log("Service worker registration failed, error:", err);
//         });
// }

ReactDOM.render(
  <React.StrictMode>
      <MuiThemeProvider theme={theme}>
      <App />
      </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
