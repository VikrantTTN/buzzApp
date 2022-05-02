import React, { useState, useEffect, useContext } from "react";
import "./profile.css";
import Topbar from "../../Components/Topbar/Topbar";
import Feed from "../../Components/feed/Feed";
import { Add , Remove} from '@material-ui/icons'
import profileImg from '../../Assests/avatar.jpeg';
import axios from 'axios';
import { Context } from "../../Context/Context";
import { useParams } from "react-router";
import { margin, padding } from "@mui/system";
export default function Profile() {
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState(true);
  const params = useParams();
  const friend_id = params.id;
  const path = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    let fetchUser = async () => {
      let res;
      if (friend_id) {
        res = await axios.get(`/feeds/${friend_id}`);
      } else {
        res = await axios.get('/feeds');
      }
      setUser({ ...res.data.message })
    }
    fetchUser();
  }, [friend_id]);

  useEffect(() => {
    if (friend_id) {
      let mainUser;
      const addFriend = async () => {
        const res = await axios.get('/feeds');
        mainUser = res.data.message;
        //console.log(mainUser.friends.includes(friend_id));
        if (mainUser.friends?.includes(friend_id)) {
          setFriends(true)
        } else {
          setFriends(false)
        }
      }
      addFriend();
    }
  }, [friend_id]);

  const handleClick = async () => {
    setFriends(!friends)
    console.log(friends);
    if (!friends) {
      let res = await axios.patch(`/feeds/${friend_id}/addfriend`);
      setFriends(true);
    } else {
      let res = await axios.patch(`/feeds/${friend_id}/unfriend`);
      setFriends(false);
    }
  }
  console.log(friends);
  return (
    <>
      <Topbar />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">


              <img
                className="profileUserImg"
                src={user.profileImg ? path + user.profileImg : profileImg}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.name}</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <div className="Left-content" style={{ width: "20%", marginTop: "30px", marginLeft: "10px" }}>
              {
                friend_id && <button className="rightbarFollowButon" style={{
                  marginTop: '30px',
                  marginBottom: '10px',
                  marginLeft: '10px',
                  border: "none",
                  backgroundColor: 'purple',
                  color: 'white',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: "center",
                  padding: "5px 10px"
                }} onClick={handleClick}>
                  {
                    !friends ? <>Make friend <Add /></> : <>Unfriend <Remove/></>
                  }

                </button>
              }
              <h3 className="rightbarTitle">Profile Details</h3>
              <div className="rightbarInfo">
                <div className="rightbarInfoItem" >
                  <span className="rightbarInfoKey">E-mail:</span>
                  <span className="rightbarInfoValue">{user.email}</span>
                </div>
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">City:</span>
                  <span className="rightbarInfoValue">{user.city || "update your city"}</span>
                </div>
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Friends:</span>
                  <span className="rightbarInfoValue">{user.friends?.length}<span />

                  </span>
                </div>
              </div>
            </div>
            <div className="feeds-content">
              <Feed profile friend_id={friend_id} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}