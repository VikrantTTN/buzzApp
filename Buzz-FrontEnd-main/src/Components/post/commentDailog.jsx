import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import {ClearOutlined} from '@material-ui/icons';
import axios from 'axios';
import avatar from '../../Assests/avatar.jpeg'
export default function CommentDailog({ post , user }) {
  const [open, setOpen] = React.useState(false);
  const [allComment, setallComment] = React.useState([]);
  const [comment, setComment] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const path = process.env.REACT_APP_PUBLIC_FOLDER;
  React.useEffect(() => {
    (async function fetchComments() {
      const res = await axios.get('/posts/comments/' + post._id);
      setallComment([...res.data])
      setLoading(false)
    })();
  }, [post, loading])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleClick = async () => {
    let objComment = {
      comment,
      post: post._id
    }
    await axios.post('/posts/comments', objComment);
    setLoading(true);
    setComment('');
    // console.log(res.data);
  };

  const handleDelete = async (id)=>{
    await axios.delete('/posts/comments/' + id);
    setLoading(true);
  }
  return (
    <div>
      <Button color='secondary' onClick={handleClickOpen}>
        {allComment.length} Comments
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle sx={{lineHeight:0}} size='large'><div className="heading"><h2>Comments</h2></div></DialogTitle>
        <DialogContent>

          {
            allComment.length !== 0 ?
              !loading ? allComment.map((c) => (
                <div className="commentCont" style={{ padding: '5px', display: 'flex' , justifyContent:'flex-start' }} key={c._id}>

                  <div className="commentPic" style={{ }}>
                    <img style={{objectFit: "cover" ,height: '40px',width: '40px' ,borderRadius:"50% "}} src={c.user.profileImg ? path + c.user.profileImg : avatar} alt="" />
                  </div>

                  <div className="commentText" style={{padding:'11px' , width:'100%',borderBottom:'0.5px solid #bdc3c7', display:'flex' , justifyContent:'space-between'}}>
                    <DialogContentText>
                      {
                        c.comment
                      }
                    </DialogContentText>

                    {
                      user._id === post.userId || user._id === c.user._id ?  <div className="deleteBtn">
                     <ClearOutlined onClick={()=>handleDelete(c._id)}/>
                      </div> : null
                    }

                  </div>
                      
                </div>
              )) :
                <div className="loading" style={{ display: 'flex', justifyContent: 'center' }}>
                  <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress color="secondary" />
                  </Stack>
                </div>
              : <div className="noComent" style={{ display: 'flex', justifyContent: 'center' }}>
                <h2>No Comments</h2>
              </div>
          }

          <div className="text-filled" style={{ display: 'flex', justifyContext: 'center', alignItem: 'center', marginTop: '15px' }}>
            <TextField
              autoFocus
              id="name"
              label="Enter Comment"
              type="text"
              fullWidth
              size='small'
              variant="outlined"
              color='secondary'
              value={comment}
              onChange={(e) => { setComment(e.target.value) }}
            />
            <Button color='secondary' disabled={comment.length === 0} onClick={handleClick}>Post</Button>
          </div>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
}