import React, { useState, useEffect, useContext } from "react";
import "./profile.css";
import Topbar from "../../Components/Topbar/Topbar";
import LeftBar from "../../Components/LeftBar/Leftbar";
import Feed from "../../Components/feed/Feed";
import Rightbar from "../../Components/rightbar/RightBar";
import profileImg from '../../Assests/profilePicture.jpeg';
import axios from 'axios';
import { Context } from "../../Context/Context";
export default function Profile() {
  // const [user, setUser] = useState({});

  const { user } = useContext(Context)
  console.log(user);
  return (
    <>
      <Topbar />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">


              <img
                className="profileUserImg"
                src={profileImg}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.name}</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <div className="Left-content" style={{ width: "20%" , marginTop:"30px" }}>
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
                  <span className="rightbarInfoValue">{user.friends?.length}<span/>
                    
                  </span>
                </div>
              </div>
            </div>
            <div className="feeds-content">
              <Feed profile />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}