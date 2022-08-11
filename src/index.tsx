import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { GlobalProvider } from './context/GlobalState';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ReactDOMClient from 'react-dom/client';
import Header from './elements/Header';
import Footer from './elements/Footer';
import Welcome from './pages/Welcome';
import CreateVault from './pages/CreateVault';
import LoadVault from './pages/LoadVault';
import EditVault from './pages/EditVault';

try {
  const container = document.querySelector('body');

  if (!container) throw new Error('No body element was found in the document.');

  const root = ReactDOMClient.createRoot(container);

  root.render(
    <React.StrictMode>
      <GlobalProvider>
        <Router>
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="app">
                <Route path="welcome" element={<Welcome />} />
                <Route path="edit" element={<EditVault />} />
                <Route path="create" element={<CreateVault />} />
                <Route path="load" element={<LoadVault />} />
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
