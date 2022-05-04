import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CommentDailog() {
  const [open, setOpen] = React.useState(false);
  const [allComment , setallComment] = React.useState([])
  const [comment , setComment] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
   
  };

  return (
    <div>
      <Button color='secondary' onClick={handleClickOpen}>
        0 Comments
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth ={true}>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          <DialogContentText>
            //Comment will be here 
          </DialogContentText>

          <DialogContentText>
            //Comment will be here 
          </DialogContentText>


          <DialogContentText margin="dense">
            //Comment will be here 
          </DialogContentText>

          <DialogContentText margin="dense">
            //Comment will be here 
          </DialogContentText>

          <div className="text-filled" style={{display:'flex' , justifyContext:'center' , alignItem :'center' , marginTop:'15px'}}>
          <TextField
            autoFocus
            id="name"
            label="Enter Comment"
            type="text"
            fullWidth
            size='small'
            variant="outlined"
            color='secondary'
            onChange={(e)=>{setComment(e.target.value)}}
          />
          <Button color='secondary' onClick={handleClose}>Post</Button>
          </div>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
}