import "./Topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import profilePicture from '../../Assests/profilePicture.jpeg';

export default function Topbar() {
  return (
    <div className="topCont">
      <div className="topL">
        <span className="logoMain">buZZAApp</span>
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
      </div>
    </div>
  );
}