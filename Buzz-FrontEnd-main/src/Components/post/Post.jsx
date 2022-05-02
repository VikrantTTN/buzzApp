import React, { useEffect, useState, useContext } from 'react';
import './post.css';
import profilePicture from '../../Assests/avatar.jpeg';
import heart from '../../Assests/heart.png';
import heartT from '../../Assests/heartT.png';
import { MoreVert, DeleteForeverOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Context } from "../../Context/Context";
import { format } from "timeago.js";
export default function Post({ post, user }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [postUser, setPostUser] = useState("");
    const { loading, setLoading } = useContext(Context);
    const path = process.env.REACT_APP_PUBLIC_FOLDER;

    const deletePost = async () => {
        try {
            const res = await axios.delete(`/posts/${post._id}`);
            if (res.data == 'Bad request' || res.status == 400) {
                window.alert(' You cannot delete other user post')
            } else {
                window.alert('Post Deleted');
                setLoading(true);
            }
        } catch (err) {
            console.log(err.message);
        }

    }

    const handleClick = async () => {
        let res = await axios.patch('/posts/' + post._id + '/like');
        console.log(res);
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked)
    }

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
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    {
                        user._id == post.userId ? <div className="postTopRight">
                            <DeleteForeverOutlined onClick={deletePost} />
                        </div> : null
                    }
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
