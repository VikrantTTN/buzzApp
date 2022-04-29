import React, { useEffect, useState } from 'react';
import './post.css';
import profilePicture from '../../Assests/avatar.jpeg';
import heart from '../../Assests/heart.png';
import heartT from '../../Assests/heartT.png';
import { MoreVert } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from "axios";
export default function Post({ post, user }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [postUser, setPostUser] = useState("");
    const path = process.env.REACT_APP_PUBLIC_FOLDER;
    const handleClick = async () => {
        let res = await axios.patch('/posts/' + post._id + '/like');
        console.log(res);
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked)
    }
    console.log(post);
    useEffect(() => {
        setIsLiked(post.likes.includes(user._id));
    }, [user._id, post.likes])

    useEffect(() => {
        const postuser = async () => {
            let res = await axios.get("/feeds/" + post.userId);
            //console.log(res.data.data);
            setPostUser({ ...res.data.message })
        }
        postuser();
    }, [post.userId])
    return (
        <div className='post'>
            <div className='postWrapper'>
                <div className='postTop'>
                    <div className="postTopLeft">
                        <Link to={`/user`} style={{ textDecoration: "none" }}>
                            <img className='postProfileImg' src={postUser.profileImg ? path + postUser.profileImg : profilePicture} />
                        </Link>
                        <span className='postUsername' >{postUser.name}</span>
                        <span className='postDate'>2 min ago</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className='postCenter'>
                    <span className='postText'> {post.caption} </span>
                    <img className='postImg' src={post.image ? path + post.image : null}
                    />
                </div>
                <div className='postBottom'>
                    <div className="postBottomLeft">
                        <img className='likeIcon' src={isLiked ? heart : heartT} onClick={handleClick} alt="" />
                        <span className='postLikeCounter'>{like} Likes</span>
                    </div>
                    <div className="postBottomRight">
                        <span className='postCommentText'>6 Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
