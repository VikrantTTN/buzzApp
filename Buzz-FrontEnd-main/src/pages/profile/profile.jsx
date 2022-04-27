import React, { useState, useEffect, useContext } from "react";
import "./profile.css";
import Topbar from "../../Components/Topbar/Topbar";
import LeftBar from "../../Components/LeftBar/Leftbar";
import Feed from "../../Components/feed/Feed";
import Rightbar from "../../Components/rightbar/RightBar";
import profileImg from '../../Assests/avatar.jpeg';
import axios from 'axios';
import { Context } from "../../Context/Context";
import { useParams } from "react-router";
export default function Profile() {
  const [user, setUser] = useState({});
  const params = useParams();
  const friend_id = params.id;
  useEffect(() => {
    let fetchUser = async () => {
      let res;
      if (friend_id) {
        res = await axios.get(`/feeds/${friend_id}`);
      } else {
        res = await axios.get('/feeds');
      }
      setUser({...res.data.message})
    }
    fetchUser();
  }, [user])
  
  const path = process.env.REACT_APP_PUBLIC_FOLDER;
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
            <div className="Left-content" style={{ width: "20%", marginTop: "30px" }}>
              <h3 className="rightbarTitle">Profile Details</h3>
              <div className="rightbarInfo">
                <div className="rightbarInfoItem">
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