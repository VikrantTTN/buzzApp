import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function CommentDailog({ post }) {
  const [open, setOpen] = React.useState(false);
  const [allComment, setallComment] = React.useState([]);
  const [comment, setComment] = React.useState('');

  React.useEffect(() => {
    (async function fetchComments() {
      const res = await axios.get('/posts/comments/' + post._id);
      setallComment([...res.data])
    })();
  }, [post])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = ()=>{
    setOpen(false);
  }

  const handleClick = async () => {
    let objComment = {
      comment,
      post: post._id
    }
    const res = await axios.post('/posts/comments', objComment);
    // console.log(res.data);
  };

  return (
    <div>
      <Button color='secondary' onClick={handleClickOpen}>
        {allComment.length} Comments
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>

          {
            allComment.map((c) => (
              <div className="commentCont" style={{padding:'5px'}} key={c._id}>
                <DialogContentText>
                {
                  c.comment
                }
              </DialogContentText>
                <hr></hr>
              </div>
            ))
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