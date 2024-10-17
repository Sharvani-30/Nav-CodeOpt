//import logo from './logo.svg';
import './App.css';
import Navbar from './styles/Navbar.css'; 
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
      </Router>
    </div>
  );
}

export default App;
