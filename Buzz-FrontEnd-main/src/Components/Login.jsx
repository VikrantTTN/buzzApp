import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoginStyle from './loginStyle.css';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TTN from '../Assests/TTN-logo.jpg'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { GoogleLogout, GoogleLogin } from 'react-google-login'

export default function Login() {

  const clientId = '633922253147-04l402ifr80bgmvr5hqv50204tvb9al0.apps.googleusercontent.com';

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showLoginButton, setshowLoginButton] = React.useState(true);
  const [showLogoutButton, setshowLogoutButton] = React.useState(false);

  const onLoginSuccess = (res) => {
    navigate('/feeds');
    console.log('Login Successful', res.profileObj)

    setshowLoginButton(false);
    setshowLogoutButton(true);
  }
  const onLoginFailure = (res) => {
    console.log('Login failed', res)
  }
  const onSignoutSuccess = () => {
    console.log('Signed out Successfully')
    setshowLoginButton(true);
    setshowLogoutButton(false);
    console.clear();
  }

  let navigate = useNavigate();
  const handleClick = async () => {
    console.log(email, password);
    if (email && password) {
      
      const res = await axios.post('/login', { email: email, password: password });
      if (res.data.message === "Logged in" && res.status === 200) {
        navigate('/feeds');
      } else {
        alert("Wrong Credintials")
      }
    } else {
      alert("enter email and password")
    }
  }
  return (
    <div className='loginWrapper'  >
      <div className='imgCard' style={{ marginLeft: '5vw' }}>
        <Card style={{ border: "none", boxShadow: "none" }}>
          <div className="ttn-img">
            <img src={TTN} alt="" />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'center' }}>
              Enter your details and Start your journey with us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Don't Stop until you are proud
            </Typography>
          </CardContent>

          <CardActions>
            
            {showLoginButton ? <GoogleLogin
              clientId={clientId}
              buttonText="Sign In"
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              cookiePolicy={'single_host_origin'}
            /> : null}

            {showLogoutButton ? <GoogleLogout
              clientId={clientId}
              buttonText="Sign Out"
              onLogoutSuccess={onSignoutSuccess}
            >
            </GoogleLogout> : null}

          </CardActions>
        </Card>
      </div>

      {/* // Login Card */}

      <div className='loginCard' style={{ marginRight: '10vw' }}>

        <Card style={{ border: "none", boxShadow: "none" }}>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: "2vh" }} >
              Login To Your Account
            </Typography>
            <TextField id="standard-basic" label="TTN Username" variant="standard" fullWidth={true} margin='normal' size='small' value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField id="standard-basic" label="Password" variant="standard" fullWidth={true} margin='normal' size='small' input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <FormControlLabel control={<Checkbox color="secondary" />} label="Remember me" />
            <Typography varient="subtitle1" margin='dense' sx={{ display: 'inline-block', marginLeft: "7vw", marginTop: '2vh' }}>
              Forget Password ?
            </Typography>
          </CardContent>

          <CardActions>
            <Button variant="contained" color='secondary' size="large" sx={{ margin: 'auto' }} margin='normal' onClick={handleClick} >
              Login
            </Button>
          </CardActions>
          <CardContent>
            <Typography varient="subtitle1" sx={{ textAlign: 'center' }} >
              Dont have an account  ? <Link to="/signup" style={{ textDecoration: "none" }} >Sign Up</Link>
            </Typography>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

// anas