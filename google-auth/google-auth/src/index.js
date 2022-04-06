import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';//new
import Login from './Login'//new

//new
ReactDOM.render(
  <React.StrictMode>
    <div className='g-signin'>
    <Login />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

