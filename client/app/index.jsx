import React from 'react';
import ReactDOM from 'react-dom';

import './reset.scss';
import App from './App';

const rootElement = document.getElementById('app');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement,
);
