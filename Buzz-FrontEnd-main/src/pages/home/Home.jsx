import Topbar from '../../Components/Topbar/Topbar'
import Leftbar from '../../Components/LeftBar/Leftbar'
import Feed from "../../Components/Feed/Feed";
import "./Home.css"

export default function Home() {
  return (
    <>
      <Topbar/>
      <div className="homeContainer">
        <Leftbar />
        <Feed/>
      </div>
    </>
  );
}