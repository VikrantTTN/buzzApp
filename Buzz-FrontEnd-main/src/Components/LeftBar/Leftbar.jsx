import "./Leftbar.css";
import { useState, useEffect, useContext } from 'react';
import { Context } from '../../Context/Context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  RssFeed,
  PlayCircleFilledOutlined,
  HelpOutline,
} from "@material-ui/icons";
import friend from '../../Assests/avatar.jpeg';

export default function LeftBar() {
  const [suggested, setSuggested] = useState([]);
  const { user } = useContext(Context);
  const path = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    (async function suggestedFriends() {
      let res = await axios.get('/feeds/all');
      setSuggested([...res.data.filter((s)=> user._id !== s._id)])
    })();
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <h3>Suggested users</h3>
        <ul className="sidebarFriendList">
          {
            suggested.map((suggest) => (
              <Link to={`user/${suggest._id}`} style={{ textDecoration: "none" }} key={suggest._id}>
                {
                  user._id != suggest._id &&
                  <li className="sidebarFriend" >
                    <img src={suggest.profileImg ? path + suggest.profileImg : friend} alt="" className="sidebarFriendImg" />
                    <span className="sidebarFriendName" >{suggest.name}</span>
                  </li>
                }
              </Link>
            ))
          }

        </ul>
      </div>
    </div>
  );
}