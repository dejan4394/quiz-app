import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import "../App.css"
import Button from '@mui/material/Button';
import "@fontsource/roboto";
import { Grid, Typography } from '@mui/material';
import Questions from '../components/Questions';


const LinuxQuiz = () => {

    
    const [ list, setList ] = useState([])
    const [ answers, setAnswers ] = useState ({})

    const linuxUrl = 'https://quizapi.io/api/v1/questions?apiKey=vVrNukhRrRlwAFZsUkwgRR7UxMyWWrswSowKyAFb&category=linux&limit=5&tags=Linux'
    
    
    const getQuizDocker = ()=>{
        axios.get(linuxUrl)
        .then(res=>{ 
        setList(res.data)
        setAnswers(res.data.answer)
        console.log(answers);
        })
        .catch(err=>{
            console.log(err);  
        })

    }

    useEffect(() => {
        getQuizDocker()
    }, []);


    const handleSubmit = ()=>{
        console.log("Sends POST Request to the server");
    }

    return (
        <> 
        <Grid container justifyContent="center" margin="10px 0">
        <Typography variant="h2">
            LINUX QUIZ
        </Typography>
        </Grid>         
        <Questions list={list}/>
        <div className="submit-button">
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </div>
        </>
    )
}

export default LinuxQuiz
