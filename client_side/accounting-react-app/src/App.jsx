<script src="http://localhost:8097"></script>
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Concepts from './pages/Concepts.jsx';
import About from'./pages/About.jsx';
import Playground from './pages/Playground.jsx';
import AuthPage from './pages/Auth/AuthPage.jsx';

function App() {

  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path="/concepts" element={<Concepts/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/playground" element={<Playground/>}/>
        <Route path="/Auth" element={<AuthPage/>}/>
      </Routes>

    <Footer/>
    </Router>
  );
}

export default App