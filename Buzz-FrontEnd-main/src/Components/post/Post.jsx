import React from 'react';
import './post.css';
import profilePicture from '../../Assests/profilePicture.jpeg';
import like from '../../Assests/like.png';
import heart from '../../Assests/heart.png';
import { MoreVert } from '@material-ui/icons';
export default function Post() {
  return (
    <div className='post'>
        <div className='postWrapper'>
            <div className='postTop'>
                <div className="postTopLeft">
                    <img className='postProfileImg' src={profilePicture} />
                    <span className='postUsername'>Shizuka</span>
                    <span className='postDate'>2 min ago</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className='postCenter'>
                <span className='postText'> Hey! Its my first post </span>
                <img className='postImg' src ={profilePicture}/>
            </div>
            <div className='postBottom'>
                <div className="postBottomLeft">
                    <img className='likeIcon' src={like} alt="" />
                    <img className='likeIcon' src={heart} alt="" />
                    <span className='postLikeCounter'>32 Likes</span>
                </div>
                <div className="postBottomRight">
                    <span className='postCommentText'>6 Comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
