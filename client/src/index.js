import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './components/Auth';
import Overview from './components/Overview';

ReactDOM.render(
  <React.StrictMode>
    <Overview/>
    {/* <Auth/> */}
  </React.StrictMode>,
  document.getElementById('root')
);

