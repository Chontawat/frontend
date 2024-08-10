import React from 'react';
import ReactDOM from 'react-dom/client'; // ใช้ react-dom/client แทน react-dom
import App from './App';

// สร้าง root object
const root = ReactDOM.createRoot(document.getElementById('root'));

// ใช้ root.render แทน ReactDOM.render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);