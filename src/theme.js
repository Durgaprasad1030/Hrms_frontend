import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Import the CSS file where we pasted the "Normal CSS" styles
import './App.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);