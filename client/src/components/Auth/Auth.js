import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {signin, signup} from '../../actions/auth';
import {
  Avatar,
  Paper,
  Grid,
  Typography,
  Container,
  Button,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./icon";

const initialState = {name: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup){
      dispatch(signup(formData, history));
    }
    else{
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };
  const googleSuccess = async(res)=>{
    const result = res?.profileObj;
    const token = res?.tokenId;

    try{
        dispatch({type: 'AUTH', data : {result,token}});
        history.pushState('/');
    }catch(error){
        console.log(error);
    }
  };

  const googleFailure = (error)=>{
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="name"
                  label="Name"
                  handleChange={handleChange}
                  autoFocus
                  xs={6}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <GoogleLogin
            clientId="571712873351-vvpjo8q3nkpvj5bgkugc84fcd9ptue0g.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess = {googleSuccess}
            onFailure = {googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an accout? Sign In"
                  : "Don't have an account"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
