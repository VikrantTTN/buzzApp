import Topbar from "../../Components/Topbar/Topbar";
import Feed from "../../Components/feed/Feed";
import Post from "../../Components/post/Post";
function Home() {
  return (
    <div>
      <Topbar />
      <Feed />
      <Post/>
    </div>
  )
}

export default Home