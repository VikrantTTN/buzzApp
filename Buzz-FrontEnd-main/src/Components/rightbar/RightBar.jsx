import "./rightBar.css";
import birthday from '../../Assests/birthday.png'
import party from '../../Assests/party.jpg';
import profile from '../../Assests/profilePicture.jpeg';
import avatar from '../../Assests/avatar.jpeg'
export default function Rightbar() {

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img className="birthdayImg" src={birthday} alt=""/>
          <span className="birthdayText">
            <b>Adam</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img className="rightbarAd" src={party}/>
        <h4 className="rightbarTitle">online Friends</h4>
        <ul className="rightbarFriendList">
          <li className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src={avatar}/>
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">Adam</span>
          </li>
          <li className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src={avatar}/>
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">Herry</span>
          </li>
          <li className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src={avatar}/>
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">Jacob</span>
          </li>
          <li className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src={avatar}/>
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">Rose</span>
          </li>
        </ul>
      </div>
    </div>
  );
}