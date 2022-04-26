import "./rightBar.css";
import { useContext} from "react";
import birthday from '../../Assests/birthday.png';
import party from '../../Assests/party.jpg';
import profile from '../../Assests/profilePicture.jpeg';
import avatar from '../../Assests/avatar.jpeg';
import { Context } from "../../Context/Context";
export default function Rightbar() {

  const {friends} = useContext(Context);
  console.log(friends);
  const path = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img className="birthdayImg" src={birthday} alt=""/>
          <span className="birthdayText">
            <b>Adam</b> and <b>2 other friends</b> have a birthday today
          </span>
        </div>
        <img className="rightbarAd" src={party}/>
        <h4 className="rightbarTitle">Your Friends</h4>
        <ul className="rightbarFriendList">
          {
            friends.map((friend)=>(
              <li className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src={friend.profileImg ? path + friend.profileImg : avatar}/>
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">{friend.name}</span>
          </li>
            ))
          }
         
        </ul>
      </div>
    </div>
  );
}