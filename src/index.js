import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../src/components/App/App.jsx';
import contactsReducer from '../src/components/redux/contactsSlice.js';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
