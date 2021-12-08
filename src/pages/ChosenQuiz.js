import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import "../App.css"
import Button from '@mui/material/Button';
import { useParams } from 'react-router';
import "@fontsource/roboto";
import { Grid, Typography } from '@mui/material';
import Questions from '../components/Questions';


const ChosenQuiz = () => {

    
    const [ list, setList ] = useState([])
    // const [ answers, setAnswers ] = useState ({})
    const [ quizTag, setQuizTag ] = useState('')
    const [ category, setCategory ] = useState('')
    

    const id = useParams()
    
    useState(()=>{
        setQuizTag(id.id)
        setCategory(id.category)
    },[])

    useEffect(() => {
        getQuiz()
    }, []);

    const Url = 
    `https://quizapi.io/api/v1/questions?apiKey=vVrNukhRrRlwAFZsUkwgRR7UxMyWWrswSowKyAFb&category=${quizTag}`


    const getQuiz = ()=>{
        axios.get(Url)
        .then(res=>{ 
        setList(res.data)
        console.log(res);
        })
        .catch(err=>{
            console.log(err);  
        })

    }

   


    const handleSubmit = ()=>{
        console.log("Sends POST Request to the server");
    }

    return (
        <> 
        <Grid container justifyContent="center" margin="10px 0">
        <Typography variant="h2">
            {category} QUIZ
        </Typography>
        </Grid>         
        <Questions list={list}/>
        <div className="submit-button">
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </div>
        </>
    )
}

export default ChosenQuiz
