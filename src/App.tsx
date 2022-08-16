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
import logo from './assets/grayscale.png';
import WatchLocation from './elements/WatchLocation';
import { GlobalContext } from './context/GlobalState';
import { useContext } from 'react';
export default function App() {
  const { location } = useContext(GlobalContext);

  return (
    <Router>
      <Header />
      <Snackbar />
      <WatchLocation />
      <div className="flex-grow">
        <img
          src={logo}
          className={`absolute z-0 -translate-x-1/3  translate-y-1/2 select-none pointer-events-none transition-opacity duration-200 ${
            location?.pathname === '/' ? 'opacity-0' : 'opacity-25'
          }`}
        />
        <img
          src={logo}
          className={`absolute right-0 top-0 z-0 translate-x-1/3 opacity-25 -translate-y-1/4 select-none pointer-events-none transition-opacity duration-200 ${
            location?.pathname === '/' ? 'opacity-0' : 'opacity-25'
          }`}
        />

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
      <Footer />
    </Router>
  );
}
