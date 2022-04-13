import './share.css';
import { PermMedia, Label, Room, EmojiEmotionsRounded } from "@material-ui/icons";
import profilePicture from '../../Assests/profilePicture.jpeg';
export default function Share() {
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={profilePicture} alt="" />
                    <input
                        placeholder="What's in your mind Safak"
                        className="shareInput" />
                </div>
                <hr className='shareHr' />
                <div className="shareBottom">
                    <div className='shareOptions'>
                        <div className='shareOption'>
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className='shareOptionText'>Photo or video</span>
                        </div>
                    </div>
                    <div className='shareOptions'>
                        <div className='shareOption'>
                            <Label htmlColor='blue' className='shareIcon' />
                            <span className='shareOptionText'>Tag Friends</span>
                        </div>
                    </div>
                    <div className='shareOptions'>
                        <div className='shareOption'>
                            <Room htmlColor='Red' className='shareIcon' />
                            <span className='shareOptionText'>destination</span>
                        </div>
                    </div>
                    <div className='shareOptions'>
                        <div className='shareOption'>
                            <EmojiEmotionsRounded htmlColor='Green' className='shareIcon' />
                            <span className='shareOptionText'>Status</span>
                        </div>
                    </div>
                    <button className='shareButton'>Share</button>
                </div>
            </div>
        </div>
    )
}
