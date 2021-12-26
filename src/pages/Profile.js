import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Typography from '@mui/material/Typography';
import "@fontsource/roboto";
import { Grid } from '@mui/material';
import WarningMsg from '../components/WarningMsg.js';
import CardComponent from "../components/CardComponent.js"
import Box from '@mui/material/Box';
import { height } from '@mui/system';



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
        <Grid item md={4} sm={12} height={{md:"auto", sm:"40vh"}} backgroundColor="gray">
        
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
        
        <Grid item md={8} display="flex" flexDirection="column" justifyItems="center">

          <Grid container justifyContent="center">
            <WarningMsg message={responseFromServer}/>
          </Grid>
        
          <Grid container display="flex" wrap="wrap" spacing={2}>
                  {completedQuizes && completedQuizes.map((item, idx)=>{
                            return <Grid item display="flex" md={6}> 
                                    <CardComponent key={idx} category={item.quiz_name} score={item.score}/>
                                  </Grid>
                        })}
          
          </Grid>
              
          </Grid>
      </Grid>
        
            
       
    )
}

export default Profile
