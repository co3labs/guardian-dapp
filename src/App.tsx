import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Header from './elements/Header';
import Footer from './elements/Footer';
import Welcome from './pages/Welcome';
import CreateVault from './pages/CreateVault';
import MyVaults from './pages/MyVaults';
import NotFound from './elements/NotFound';
import Snackbar from './elements/Snackbar';
import WatchLocation from './elements/WatchLocation';
import { GlobalContext } from './context/GlobalState';
import { useContext } from 'react';
export default function App() {
  return (
    <Router>
      <Header />
      <Snackbar />
      <WatchLocation />
      <div className='flex-grow relative z-10 overflow-scroll no-scrollbar flex flex-col'>
        <div className='flex-grow'>
          <Routes>
            <Route path="" element={<LandingPage />} />
            <Route path="app">
              <Route path="welcome" element={<Welcome />} />
              <Route path="create" element={<CreateVault />} />
              <Route path="manage" element={<MyVaults />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </Router>
  );
}
