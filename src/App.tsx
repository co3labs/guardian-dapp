import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Swap from './components/Swap';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Swap />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
