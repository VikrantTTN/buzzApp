import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from 'axios';
import { useEffect, useState , useContext} from "react";
import Spinner from "../post/Spinner";
import { Context } from "../../Context/Context";

export default function Feed({ profile }) {
    const [posts, setPosts] = useState([]);  
    const { user , loading , setLoading } = useContext(Context);
    useEffect(() => {
        const fetchPosts = async () => {
            let res ;
            if (!profile) {
                res =  await axios.get('/posts/feedposts');
            }else{
                console.log("profile");
                res =  await axios.get('/posts/userPosts');
            }
            setPosts([...res.data.sort((post1 , post2)=>{
                return new Date(post2.createdAt)- new Date(post1.createdAt)
            })]);
            setLoading(false)
        }
        fetchPosts();
    },[loading])
    //console.log(posts);


  
    return (
        <div className="feedWrapper">
            <div className="feedWrapper">
                {
                    profile ? <div className="div">
                         {loading ? <Spinner /> :
                                posts.map((p) => (
                                    <Post key={p._id} post={p} user={user} />
                                ))}
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