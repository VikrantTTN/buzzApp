import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Feeds from './Components/Feeds';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/feeds' element = {<Feeds/>}/>
      </Routes>
    </Router>
  );
}

export default App;