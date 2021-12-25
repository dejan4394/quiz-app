import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Typography from '@mui/material/Typography';
import "@fontsource/roboto";
import { Grid } from '@mui/material';
import WarningMsg from '../components/WarningMsg.js';
import CardComponent from "../components/CardComponent.js"
import Box from '@mui/material/Box';



const Profile = ({token}) => {
const [ tokenStr, setTokenStr ] = useState('')
  useEffect(() => {
    setTokenStr(token)
    getData()
  }, [tokenStr])


const [ userData, setUserData ] = useState()
const [ completedQuizes, setCompletedQuizes ] = useState([])
const [ responseFromServer, setResponseFromServer ] = useState("")


    const getData = () => {
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
          if(response.data.success){
                console.log(response);
                console.log(response.data);
                setUserData(response.data.result)
                setCompletedQuizes(response.data.result.completed_quizes)
                setResponseFromServer(response.data.message)
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
        <Grid item lg={4} height="100vh" backgroundColor="gray">
        
        {userData &&
          <Box padding="20px">
          <Typography marginBottom={2}>PROFILE</Typography>
            <Typography fontStyle="italic">First Name:</Typography>
            <Typography>{userData.firstName}</Typography>
            <Typography fontStyle="italic">Last Name:</Typography>
            <Typography>{userData.lastName}</Typography>
            <Typography fontStyle="italic">e-mail:</Typography>
            <Typography>{userData.user}</Typography>
          </Box>}
        
        </Grid>
        
        <Grid item lg={8} display="flex" flexDirection="column" justifyItems="center">
        <WarningMsg message={responseFromServer}/>
        <Grid container display="flex" wrap="wrap" spacing={2}>
                {completedQuizes && completedQuizes.map((item, idx)=>{
                          return <Grid item display="flex" lg={6}> 
                                  <CardComponent key={idx} category={item.quiz_name} score={item.score}/>
                                </Grid>
                      })}
         
        </Grid>
            
        </Grid>
      </Grid>
        
            
       
    )
}

export default Profile
