import axios from 'axios'
import React, {useEffect, useState} from 'react'
import UseToken from "../UseToken.js";
import Typography from '@mui/material/Typography';

import "@fontsource/roboto";
import { Grid } from '@mui/material';




const Profile = ({token}) => {

  useEffect(() => {
    getData()
  }, [])

const [ userData, setUserData ] = useState()
const [ completedQuizes, setCompletedQuizes ] = useState([])
const [ doesntExist, setDoesntExist ]= useState('')


    const getData = () => {
        console.log(token);
     
    axios({
        method: "get",
        url: "/results/completed",
        headers: { "Authorization" : `${token}`,
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*'}
      })
        .then((response) => {
          if(response.ok){
            return JSON.stringify(response)
          }else{
                console.log(response);
                console.log(response.data);
                setUserData(response.data)
                setCompletedQuizes(response.data.completed_quizes)

                setDoesntExist(response.data.message)
              
        }})
        .catch((err) => {
          console.log(err.message);
        });

      };


      
    

    return (
        <Grid>
        <Typography>{doesntExist}</Typography>
         {userData &&
           <Typography>{userData.user}</Typography>}
            {completedQuizes && completedQuizes.map(item=>{
                return <Typography>{item.quiz_name}</Typography>
            })}
        </Grid>
            
       
    )
}

export default Profile
