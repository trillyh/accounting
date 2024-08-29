import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Concepts from './pages/Concepts.jsx';
import About from'./pages/About.jsx';

function App() {

  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path="/concepts" element={<Concepts/>} />
        <Route path="/about" element={<About/>} />
      </Routes>

      <Footer/>
    </Router>
  );
}

export default App;
