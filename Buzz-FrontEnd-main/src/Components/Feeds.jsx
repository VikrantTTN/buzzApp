import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Feeds() {
  const [loggedIn , setloggedIn] = React.useState('')
  const navigate= useNavigate()

  useEffect( ()=>{
    async function log(){
      console.log("use effect");
      let res = await axios.get('/feeds');
      //console.log(res.data);
      setloggedIn(res.data)
    }
    log();
  },[loggedIn])
  
  if(loggedIn === 'Not_Authorized'){
    navigate('/login');
  }

  return (
    <div style={{display:'flex',justifyContent : 'center'}}>
        <h1>Welcome to the buzz app</h1>
    </div>
  )
}

export default Feeds