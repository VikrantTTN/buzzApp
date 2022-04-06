import React,{useState} from 'react'//new
import { GoogleLogout,GoogleLogin } from 'react-google-login'
//new
function Login() {
    const clientId='633922253147-04l402ifr80bgmvr5hqv50204tvb9al0.apps.googleusercontent.com';
    const [showLoginButton, setshowLoginButton] = useState(true);
    const [showLogoutButton, setshowLogoutButton] = useState(false);
    const onLoginSuccess=(res)=>{
        console.log('Login Successful',res.profileObj)
        setshowLoginButton(false);
        setshowLogoutButton(true);
    }
    const onLoginFailure=(res)=>{
        console.log('Login failed',res)
    }
    const onSignoutSuccess=()=>{
        console.log('Signed out Successfully')
        setshowLoginButton(true);
        setshowLogoutButton(false);
        console.clear();
    }
  return (
    <>
        {showLoginButton?<GoogleLogin
            clientId={clientId}
            buttonText="Sign In"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={'single_host_origin'}
        />:null}
         

        {showLogoutButton?<GoogleLogout
        clientId={clientId}
        buttonText="Sign Out"
        onLogoutSuccess={onSignoutSuccess}
        >
        </GoogleLogout>:null}
        
    
    </>
    
  )
}

export default Login

//buzz-application-346408