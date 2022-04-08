import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Feeds() {
  const [user, setUser] = React.useState('')
  const navigate = useNavigate()

  useEffect(() => {
    (async function log() {
      try {
        console.log('useeffect');
        let res = await axios.get('/feeds');
        setUser(res.data)
      } catch (err) {
        setUser('UnAuthorized')
        console.log(err.message);
      }
    })();
  }, [])

  if (user === 'UnAuthorized' ) {
    navigate('/login')
  }
  
  const handleClick=()=>{
    let res = axios.get('/logout');
    navigate('/login')
  }
 
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h1>Welcome to the buzz app </h1>
      <button onClick={handleClick}>Log Out</button>
    </div>
  )
}

export default Feeds