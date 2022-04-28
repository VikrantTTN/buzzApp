import "./Leftbar.css";
import {useState , useEffect} from 'react';
import axios from 'axios';
import {
  RssFeed,
  PlayCircleFilledOutlined,
  HelpOutline,
} from "@material-ui/icons";
import friend from '../../Assests/avatar.jpeg';

export default function LeftBar() {
  const [suggested , setSuggested] = useState([]);
  const path = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(()=>{
    (async function suggestedFriends(){
      let res = await axios.get('/feeds/all');
      setSuggested([...res.data])
    })();
  },[])
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
           suggested.map((suggest)=>(
            <li className="sidebarFriend">
            <img src={suggest.profileImg ? path + suggest.profileImg : friend} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">{suggest.name}</span>
          </li>
           ))
         }
          
        </ul>
      </div>
    </div>
  );
}