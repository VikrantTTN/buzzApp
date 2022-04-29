import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from 'axios';
import { useEffect, useState, useContext } from "react";
import Spinner from "../post/Spinner";
import { Context } from "../../Context/Context";

export default function Feed({ profile, friend_id }) {
    const [posts, setPosts] = useState([]);
    const { user, loading, setLoading } = useContext(Context);
    useEffect(() => {
        const fetchPosts = async () => {
            let res;
            if (!profile) {
                console.log("no profile");
                res = await axios.get('/posts/feedposts');
            } else if (profile && friend_id) {
                console.log("profile with friend id");
                res = await axios.get('/posts/userPosts/' + friend_id);
            }
            else {
                console.log(" only profile");
                res = await axios.get('/posts/userPosts');
            }
            setPosts([...res.data.sort((post1, post2) => {
                return new Date(post2.createdAt) - new Date(post1.createdAt)
            })]);
            setLoading(false)
        }
        fetchPosts();
    }, [loading])
    console.log(posts.length);
    return (
        <div className="feedWrapper">
            <div className="feedWrapper">
                {
                    profile ? <div className="div">
                        {loading ? <Spinner /> :
                            posts?.length !==0 ? posts.map((p) => (
                                <Post key={p._id} post={p} user={user} />
                            )) : <div style={{display:'flex' , flexDirection:'column' , justifyContent :'center' , alignItems:'center'  , padding:'10rem'}}><h1>No posts</h1> <Spinner /></div>}
                    </div> :
                        <div className="div">
                            <Share />
                            {loading ? <Spinner /> :
                                posts.map((p) => (
                                    <Post key={p._id} post={p} user={user} />
                                ))}
                        </div>
                }
            </div>
        </div>
    )
}