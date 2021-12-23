import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Typography from '@mui/material/Typography';
import "@fontsource/roboto";
import { Grid } from '@mui/material';
import WarningMsg from '../components/WarningMsg.js';
import CardComponent from "../components/CardComponent.js"



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
        <Grid>
        <WarningMsg message={responseFromServer}/>
         {userData &&
           <Typography>{userData.user}</Typography>}
            {completedQuizes && completedQuizes.map((item, idx)=>{
                return <CardComponent key={idx} category={item.quiz_name} score={item.score}/>
            })}
        </Grid>
            
       
    )
}

export default Profile
