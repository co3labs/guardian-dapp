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
import EditVault from './pages/EditVault';
import Recover from './pages/Recover';
import VoteWithId from './elements/VoteWithId';
import Vote from './pages/Vote';
import TxApprovalModal from './elements/TxApprovalModal';
export default function App() {
  const { txState } = useContext(GlobalContext);

  return (
    <Router>
      <Header />
      <Snackbar />
      <WatchLocation />
      <div className="flex-grow relative z-10 overflow-scroll no-scrollbar flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="" element={<LandingPage />} />
            <Route path="app">
              <Route path="welcome" element={<Welcome />} />
              <Route path="create" element={<CreateVault />} />
              <Route path="edit" element={<EditVault />} />
              <Route path="manage" element={<MyVaults />} />
              <Route path="recover" element={<Recover />} />
              <Route path="vote" element={<Vote />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>

      <Footer />
      {/* <TxApprovalModal /> */}
      {txState.showModal ? <TxApprovalModal /> : <></>}
    </Router>
  );
}
