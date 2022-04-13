import "./Leftbar.css";
import {
  RssFeed,
  PlayCircleFilledOutlined,
  HelpOutline,
} from "@material-ui/icons";
import friend from '../../Assests/friend.jpg';

export default function LeftBar() {
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
        <ul className="sidebarFriendList">
          <li className="sidebarFriend">
            <img src={friend} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">shiv</span>
          </li>
          
        </ul>
      </div>
    </div>
  );
}