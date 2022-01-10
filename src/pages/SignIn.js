import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useState } from "react"
import WarningMsg from '../components/WarningMsg.js';
import { useNavigate } from 'react-router-dom';
import Progress from '../components/Progress.js';

import { serverResponseActions } from '../store/responses-from-server-slice.js';
import { uiActions } from '../store/ui-slice.js';
import { useDispatch } from "react-redux"
import { tokenActions } from '../store/token-slice.js';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();



export default function SignIn({setToken}) {


  const dispatch = useDispatch()
  const navigate = useNavigate();
 

  const [ showProgres, setShowProgres ] = useState(false)
  const [ responseFromServer, setResponseFromServer ] = useState("")
  const [ user, setUser ] = useState({
    username:"",
    password: ""
  })


  const handleChange = (e)=>{
    const{value, name }= e.target
    setUser((prev)=>(
      {
        ...prev,
        [name]: value

      }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(user);

  
    axios({
        method: "post",
        url: "/users/login",
        data: user,
        headers: { "Content-Type": "application/json",
                   'Access-Control-Allow-Origin': '*'}
      })
        .then((response) => {
          if(response.data.success === false){
            return setResponseFromServer(response.data.message)
          }else{
                console.log(response.data);
                setResponseFromServer(response.data.message)
               
                const tokenStr = response.data.token
                sessionStorage.setItem('token', tokenStr);

                dispatch(tokenActions.saveToken({
                  token_string: JSON.stringify(response.data.token)
                }))

                dispatch(serverResponseActions.messageFromServer({
                  message: response.data.message
              }))
                dispatch(uiActions.setModal({
                  show: true,
                  displayFirstButton: 'none',
                  displaySecondButton: 'none'
                }))
               
                setTimeout(() => {
                  setShowProgres(false)
                  navigate("/profile")
                }, 1000);
                
        }})
        .catch((err) => {
          console.log(err.message);
        });

      };
    

  return ( 
    <ThemeProvider theme={theme}>
    { showProgres ? <Progress/> :
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <WarningMsg message={responseFromServer}/>
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="username"
              autoComplete="email"
              autoFocus
            />
            <WarningMsg message={responseFromServer}/>
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>}
    </ThemeProvider>
  );
}
