import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { store } from './app/store/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from './app/local';
import 'react-toastify/dist/ReactToastify.css';
import style from './index.module.scss';
import { TOAST_POSITION, TOAST_THEME } from './app/shared/constants';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ToastContainer position={TOAST_POSITION} theme={TOAST_THEME} />
        <App />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
