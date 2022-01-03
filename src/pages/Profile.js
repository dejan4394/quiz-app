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


const Profile = ({token}) => {

const classes = useStyles()

const [ tokenStr, setTokenStr ] = useState('')

  useEffect(() => {
    setTokenStr(token)
    getData()
  }, [tokenStr])


const [ userData, setUserData ] = useState()
const [ completedQuizes, setCompletedQuizes ] = useState([])
const [ responseFromServer, setResponseFromServer ] = useState("")
const [ showProgres, setShowProgres ] = useState(false)


    const getData = () => {

      setShowProgres(true)
        console.log(token);
    if(tokenStr)
    axios({
        method: "get",
        url: "/results/completed",
        headers: { "Authorization" : `${tokenStr}`,
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*'}
      })
        .then((response) => {
          if(response.data.success === true){
                console.log(response);
                console.log(response.data);
                setUserData(response.data.result)
                setCompletedQuizes(response.data.result.completed_quizes)
                setResponseFromServer(response.data.message)
                setShowProgres(false)
              }else{
                setResponseFromServer(response.data.message)
              }
              
        })
        .catch((err) => {
          console.log(err.message);
        });

      };


      
    

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
          {showProgres ? 
        <Progress/> :
        <Grid>
          <Grid container justifyContent="center">
            <WarningMsg message={responseFromServer}/>
          </Grid>
        
          <Grid container display="flex" wrap="wrap" spacing={2} justifyContent="center">
                  {completedQuizes ? completedQuizes.map((item, idx)=>{
                            return <Grid key={idx} item display="flex" md={6}> 
                                    <CardComponent category={item.quiz_name} score={item.score}/>
                                  </Grid>
                        }) : 
                        <Grid item>
                        <Link className={classes.link} to="/categories">
                          <Button className={classes.button} variant='contained'>Get Started</Button>
                        </Link>
                        </Grid>
                        }
          
          </Grid>
          </Grid>
          }
              
          </Grid>
      </Grid>
        
            
       
    )
}

export default Profile
