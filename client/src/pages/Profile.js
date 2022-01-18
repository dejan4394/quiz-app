import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Typography from '@mui/material/Typography';
import "@fontsource/roboto";
import { Button, Grid } from '@mui/material';
import WarningMsg from '../components/WarningMsg.js';
import CardComponent from "../components/CardComponent.js"
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Progress from '../components/Progress.js';
import { useLocation } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
// import serverResponse from '../store/responses-from-server-slice.js';
import { serverResponseActions } from "../store/responses-from-server-slice"
import { uiActions } from '../store/ui-slice.js';
import { getUserData } from '../store/profile-actions.js';

//===CSS==========================================
const useStyles = makeStyles({
  link: {
    color: 'white',
    textDecoration: "none"
  },
  link_menu: {
    textDecoration: "none"
  },
  heading:{
      border:"2px solid #2196f3",
      borderRadius: "5px",
      backgroundColor: "#e3f2fd",
      padding: "30px"
  },
  container_background:{
      backgroundColor: "#cfd8dc"
  },
  button:{
      marginBottom: "20px"
  },
  answers:{
      width:"fill-available"
  }
});
//===================================================

const Profile = ({token}) => {


const dispatch = useDispatch()

const classes = useStyles()

const [ userData, setUserData ] = useState()
const completed = useSelector( state => state.profile_data.completedQuizes )
const [ responseFromServer, setResponseFromServer ] = useState("")
const showProgress = useSelector( state => state.ui.showProgress )
const changed = useSelector( state => state.profile_data.changed )

  useEffect(() => {

        if(changed){
          dispatch(getUserData({token, setUserData, setResponseFromServer}))
      }
        dispatch(serverResponseActions.setChanged())
  }, [token, changed])


  console.log(completed);
    

    return (
      <Grid container display="flex" flexDirection="row">
        <Grid item md={4} sm={12} xs={12} minHeight={{md:"100vh", sm:"40vh"}} backgroundColor="gray">
        
        {userData &&
          <Box padding="20px">
          <Typography marginBottom={2} fontWeight="bold">PROFILE</Typography>
            <Typography fontStyle="italic">First Name:</Typography>
            <Typography fontSize="1.2rem" fontWeight="bold">{userData.firstName}</Typography>
            <Typography fontStyle="italic">Last Name:</Typography>
            <Typography fontSize="1.2rem" fontWeight="bold">{userData.lastName}</Typography>
            <Typography fontStyle="italic">e-mail:</Typography>
            <Typography fontSize="1.2rem" fontWeight="bold">{userData.user}</Typography>
          </Box>}
        
        </Grid>
        
        <Grid item md={8} sm={12} xs={12} display="flex" flexDirection="column" justifyItems="center">
          {showProgress ? 
        <Progress/> :
        <Grid container justifyContent='center'>
          <Grid container justifyContent="center">
            <WarningMsg message={responseFromServer}/>
          </Grid>
        
          {!completed ? 
          <Grid item>
          <Link className={classes.link} to="/categories">
            <Button className={classes.button} variant='contained'>Get Started</Button>
          </Link>
          </Grid>:
          <Grid container display="flex" wrap="wrap" spacing={2} justifyContent="center">
                  {completed.length > 0 ? completed.map((item, idx)=>{
                            return <Grid key={idx} item display="flex" md={6}> 
                                    <CardComponent token={token} category={item.quiz_name} score={item.score} id={idx}/>
                                  </Grid>
                        }) : 
                        <Grid item>
                        <Link className={classes.link} to="/categories">
                          <Button className={classes.button} variant='contained'>Get Started</Button>
                        </Link>
                        </Grid>
                        }
          
          </Grid>
          }
          </Grid>
          }
              
          </Grid>
      </Grid>
        
            
       
    )
}

export default Profile
