import React, { useContext } from 'react'
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Route, Routes , Navigate, } from 'react-router-dom';
import Home from './pages/home/Home';
import Profile from './pages/profile/profile';
import { Context } from "./Context/Context";
function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/user' element = {<Profile/>}/>
        <Route path='/user/:id' element = {<Profile/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/signup' element = {<Signup/>}/>   
      </Routes>
    </Router>
  );
}

export default App;