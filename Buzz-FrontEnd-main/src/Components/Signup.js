import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import TTN from '../Assests/TTN-logo.jpg'
import Alert from '@mui/material/Alert';
import { Link , useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();
    const handleClick = async ()=>{
       try{
       if(email && name && password && confirmPassword){
        let res = await axios.post('/signup' , {name:name ,email : email, password : password , confirmPassword: confirmPassword});
            if(res.status===200){
                window.alert("Signup success");
                navigate('/login')
            }else{
                window.alert("fill all details")
            }
       }
       else{
            window.alert("Enter Details")
       }

       }catch(err){
           console.log(err);
       }
    }
    return (
        <div className="signupWrapper" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="signupCard" style={{ width: '25vw', marginTop: "5rem" }}>
                <Card varient='outlined'>
                    <div className="insta-img" style={{ display: 'flex', justifyContent: 'center' }} >
                        <img src={TTN} alt="" style={{ width: '80%', height: '22vh' }} />
                    </div>
                    <CardContent>
                        <Typography varient="subtitle1" margin='dense' sx={{ textAlign: 'center' }} >
                            Sign up to see photos and videos from your friends
                        </Typography>
                        {/* {error && <Alert severity="error" margin='dense' >{error}</Alert>} */}
                        <TextField id="outlined-basic" label="Full Name " variant="outlined" fullWidth={true} margin='normal' size='small' value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='normal' size='small' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='normal' size='small' input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <TextField id="outlined-basic" label="Confirm Password" variant="outlined" fullWidth={true} margin='normal' size='small' input type="password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />

                    </CardContent>
                    <CardActions>
                        <Button size="small" color="secondary" fullWidth={true} variant="contained" onClick={handleClick} >
                            Sign Up
                        </Button>
                    </CardActions>
                    <CardContent>
                        <Typography varient="subtitle1" sx={{ textAlign: 'center' }} >
                            By signing up, you agree to our Terms , Data Policy and Cookies Policy.
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant='outlined' >
                    <CardContent>
                        <Typography varient="subtitle1" sx={{ textAlign: 'center' }}>
                            Having an account ? <Link to="/login" style={{ textDecoration: "none" }} >Login</Link>
                        </Typography>
                    </CardContent>
                </Card>


            </div>
        </div>
    )
}

export default Signup