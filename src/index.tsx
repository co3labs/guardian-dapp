import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { GlobalProvider } from './context/GlobalState';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ReactDOMClient from 'react-dom/client';
import Header from './components/Header';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import CreateVault from './components/CreateVault';

try {
  const container = document.querySelector('body');

  if (!container) throw new Error('No body element was found in the document.');

  const root = ReactDOMClient.createRoot(container);

  root.render(
    <React.StrictMode>
      <GlobalProvider>
        <Router>
          <Header />
          <div className='flex-grow'>
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="app">
                <Route path="welcome" element={<Welcome />} />
                <Route path="vault/edit" element={<></>} />
                <Route path="vault/create" element={<CreateVault />} />
              </Route>
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </GlobalProvider>
    </React.StrictMode>
  );
} catch (error) {
  console.error(error);
}
