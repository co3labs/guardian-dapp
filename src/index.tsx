import React from 'react';
import './index.css';
import { GlobalProvider } from './context/GlobalState';
import ReactDOMClient from 'react-dom/client';
import App from './App';

try {
  const container = document.querySelector('body');

  if (!container) throw new Error('No body element was found in the document.');

  const root = ReactDOMClient.createRoot(container);

  root.render(
    <React.StrictMode>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </React.StrictMode>
  );
} catch (error) {
  console.error(error);
}
