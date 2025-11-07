
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/global.css';


const containerElement = document.getElementById('root');

if (!containerElement) {
  throw new Error('No root element found');
}

ReactDOM.createRoot(containerElement!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);