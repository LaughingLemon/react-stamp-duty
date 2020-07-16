import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from "./store/configureStore";
import {Provider} from "react-redux";

const appStore = configureStore();

const jsx = (
  <React.StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(jsx, document.getElementById('root'));
