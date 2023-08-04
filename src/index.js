import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './input.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './services/store';

const root = document.getElementById('root');
const rootComponent = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

const rootElement = createRoot(root);
rootElement.render(rootComponent);

reportWebVitals();
