import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GoogleLogin } from 'react-google-login';
const SignInWithGoogleStyles = theme => ({
    root: {
        margin: '1rem 4rem'
    }
})


const LoginSuccess = (response,props) => {
    props.handleSetUser({
        googleId: response.profileObj.googleId,
        email: response.profileObj.email,
        name: response.profileObj.name,
        picture: response.profileObj.imageUrl,
        userType: ''
    });
    localStorage.setItem('authToken',response.tokenId);

    
}

const LoginFailure = (response) => {

}
const SignInWithGoogle = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            {props.user.googleId===''?
            <GoogleLogin
                clientId="247899695031-i2lrgqjm8hoo9e0l650d68e2187fjt7v.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={(response)=>LoginSuccess(response,props)}
                onFailure={LoginFailure}
                cookiePolicy={'single_host_origin'}
            />
            :
             <div>
               <p>GoogleId : {props.user.googleId}</p> 
               <p>Email : {props.user.email}</p>
               <p>Name : {props.user.name}</p>
               <img src={props.user.picture}/>
            </div>
            }
        </div>
    );
}

export default withStyles(SignInWithGoogleStyles)(SignInWithGoogle);