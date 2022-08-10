import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Swap from './components/Swap';

function App() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="">
          <Router>
            <Routes>
              <Route path="/" element={<Swap />} />
            </Routes>
          </Router>
        </div>
        <Footer />
    </div>
  );
}

export default App;
