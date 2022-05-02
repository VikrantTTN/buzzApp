import './share.css';
import { PermMedia, Label, Room, EmojiEmotionsRounded, Cancel } from "@material-ui/icons";
import profilePicture from '../../Assests/avatar.jpeg';
import { useRef, useState , useContext, useEffect} from 'react';
import { Context } from '../../Context/Context';
import axios from 'axios';
export default function Share() {
    const [file , setFile] = useState(null);
    const {user, setLoading } = useContext(Context);
    const path = process.env.REACT_APP_PUBLIC_FOLDER;
    const [caption , setCaption] = useState('');

    const handleSubmit =async (e)=>{
        e.preventDefault();
        console.log(caption);
        const post = {
            caption:caption
        } 

        if(file){
            const fileData = new FormData();
            const fileName = Date.now() +" "+ file.name;
            fileData.append("name" , fileName);
            fileData.append('file' , file);
            post.image = fileName;
            try{
                await axios.post('/upload',fileData);
            }catch(err){
                console.log(err.message);
            }
        }

        try{
            let res = await axios.post('/posts' , post);
            setCaption('');
            setLoading(true);
            setFile(null);
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
                        value={caption}
                        onChange={(e)=>setCaption(e.target.value)} />
                </div>
                <hr className='shareHr' />
                {
                    file && (
                        <div className="shareImgContainer">
                            <img className='shareImg' src={URL.createObjectURL(file)} alt=''/>
                            <Cancel className='shareCancelImg' onClick={()=>setFile(null)}/>
                        </div>
                    )
                }
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
                    <button className='shareButton' type='submit' disabled={(caption === '' && file == null) ? true : false}>Share</button>
                </form>
            </div>
        </div>
    )
}
