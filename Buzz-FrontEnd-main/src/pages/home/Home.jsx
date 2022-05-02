import Topbar from '../../Components/Topbar/Topbar';
import LeftBar from "../../Components/LeftBar/Leftbar"
import Feed from "../../Components/feed/Feed";
import "./Home.css";
import Post from "../../Components/post/Post";
import Rightbar from '../../Components/rightbar/RightBar';

export default function Home() {
  return (
    <>
      <Topbar/>
      <div className="homeContainer">
        <LeftBar />
        <Feed/>
        <Rightbar/>
      </div>
    </>
  );
}