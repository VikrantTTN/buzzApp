import './share.css';
import { PermMedia, Label, Room, EmojiEmotionsRounded } from "@material-ui/icons";
import profilePicture from '../../Assests/avatar.jpeg';
import { useRef, useState , useContext} from 'react';
import { Context } from '../../Context/Context';
import axios from 'axios';
export default function Share() {
    const [file , setFile] = useState(null);
    const {user , loading , setLoading } = useContext(Context);
    const path = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const caption = useRef()
    const handleSubmit =async (e)=>{
        e.preventDefault()
        const post = {
            caption:caption.current.value,
        } 

        if(file){
            const fileData = new FormData();
            const fileName = Date.now() +" "+ file.name;
            console.log(fileName);
            fileData.append("name" , fileName);
            fileData.append('file' , file);
            post.image = fileName;
            console.log(post);
            try{
                await axios.post('/upload',fileData);
            }catch(err){
                console.log(err.message);
            }
        }

        try{
            let res = await axios.post('/posts' , post);
            setLoading(true);
        }catch(err){
            console.log(err.message);
        }
    }
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={user.profileImg ? path + user.profileImg : profilePicture} alt="" />
                    <input
                        placeholder="What's in your mind Safak"
                        className="shareInput"
                        ref={caption} />
                </div>
                <hr className='shareHr' />
                <form className="shareBottom" onSubmit={(e)=>handleSubmit(e)}>
                    <label htmlFor='file' className='shareOptions'>
                        <div className='shareOption'>
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className='shareOptionText'>Photo or video</span>
                            <input style={{display:"none"}} type="file" id="file" accept =".png , .jpeg , .jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                        </div>
                    </label>
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
                    <button className='shareButton' type='submit'>Share</button>
                </form>
            </div>
        </div>
    )
}
