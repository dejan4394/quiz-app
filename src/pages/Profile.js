import axios from 'axios'
import React, {useState} from 'react'
import { Button, Grid, Typography } from '@mui/material';
import "@fontsource/roboto";
import MultiActionAreaCard from '../components/CardComponent';


const Profile = () => {

    const [ userData, setUserData ] = useState("")
    const [ received, setReceived ] = useState({
        quiz_name: [],
        testedUser:'',
        quizData: []
    })


    const handleUserName = (e)=>{
        e.preventDefault()
        setUserData(e.target.value)
        console.log(userData)
    }

    const GetCompleted = (e)=>{

        e.preventDefault()

        axios({
            method: "GET",
            url: "results/completed",
            params: {user: userData},
            headers: {  "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': 'http://localhost:3000/results'}
          })
         
            .then((response) => {
                console.log(response.data);
                const transformedData = {
                    quiz_name: response.data.completed_quizes.map(item=>{
                        return item.quiz_name
                    }),
                    testedUser : response.data.user,
                    quizData : response.data.completed_quizes.map(item=>{
                        return JSON.parse(item.questions)
                    })

                }
                // const object = JSON.parse(transformedData.quizData)
                setReceived(transformedData)
                console.log(received); 
                })
            .catch((err) => {
                    console.log(err)
                });
        }


    return (
        <Grid container bgcolor="primary.main" direction="column"  margin="10px 0" justifyContent="center">
            <Grid container direction="row" justifyContent="center">
                <Grid item>
                <Typography variant='h1'>
                <form onSubmit={GetCompleted} style={{display: "flex", justifyContent:"space-between"}}>
                    <input type="text" placeholder='Enter User Name' name="userName" onChange={handleUserName} value={userData}/>
                    <Button type="submit" variant='contained'>Submit</Button>
                </form>
                </Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item margin="20px 0">
                    <Typography>
                    {`Tested Person :   ${received.testedUser}`}
                    </Typography>
                </Grid>
            </Grid>
            {/* <Grid container justifyContent="center">
                <Grid item>
                {received.quizData[0].map(item=>{
                    return( 
                    <p>
                        {item.question}
                    </p>)
                })}
                </Grid>
            </Grid> */}
            <Grid container spacing={8} justifyContent="space-between" alignItems="center">
               
                {received.quiz_name.map(item=>{
                return <Grid item xs={8} md={6}>
                            <MultiActionAreaCard quizName={item} />
                        </Grid>
            })}
            </Grid>
        </Grid>
    )
}

export default Profile
