import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./Topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import profilePicture from '../../Assests/profilePicture.jpeg';
import { Button } from '@mui/material';

export default function Topbar() {
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
    window.alert("You have signed out")
    navigate('/login')
  }
 

  return (
    <div className="topCont">
      <div className="topL">
        <span className="logoMain">buZZApp</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchI" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topR">
        <div className="topbarLinks">
          <span className="Link">Homepage</span>
          <span className="Link">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src={profilePicture} alt="" className="Img"/>
        <Button variant="contained" color='secondary' size="small" onClick={handleClick}  >
          Sign out
        </Button>
      </div>
    </div>
  );
}