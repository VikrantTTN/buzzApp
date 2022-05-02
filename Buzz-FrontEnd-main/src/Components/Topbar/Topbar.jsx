import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./Topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import profilePicture from '../../Assests/avatar.jpeg';
import { Button } from '@mui/material';
import {Link} from 'react-router-dom';

export default function Topbar() {
  const [user, setUser] = React.useState('');
  const navigate = useNavigate()
  const path = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    (async function log() {
      try {
        let res = await axios.get('/feeds');
        setUser(res.data.message)
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
        <Link to ="/user"><img src={user.profileImg ? path + user.profileImg : profilePicture} alt="" className="Img"/></Link>
        <Button variant="contained" color='secondary' size="small" onClick={handleClick}  >
          Sign out
        </Button>
      </div>
    </div>
  );
}