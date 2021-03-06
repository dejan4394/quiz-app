import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import history from './history.js';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from "./App.js";
import store from "./store/index.js"


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    
  </Provider>
   ,
  document.getElementById('root')
);

