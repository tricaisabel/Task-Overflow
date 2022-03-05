import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './components/Auth';
import Overview from './components/Overview';
import {Provider} from 'react-redux';
import {store} from './state/store';

ReactDOM.render(
  <React.StrictMode>
    {/* <Overview/> */}
    <Provider store={store}>
      <Auth />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

