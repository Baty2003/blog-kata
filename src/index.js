import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { reducerArticles, reducerUser } from './redux/reducers';
import { getArticles } from './redux/actions';
import { App } from './components/App';

const store = configureStore(
  {
    reducer: {
      articles: reducerArticles,
      user: reducerUser,
    },
  },
  applyMiddleware(thunk),
);
store.dispatch(getArticles(0));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
