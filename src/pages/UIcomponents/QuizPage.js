// import { Button, Typography } from '@mui/material';
import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Grid } from '@mui/material';

export const QuizPage = () => {

    // const [ list, setList ] = useState([])
    const [ quizTag, setQuizTag ] = useState('')
   

    const id = useParams()


    console.log(id);


    useState(()=>{
        setQuizTag(id.id)
    })


    useEffect(() => {
        getQuiz()
    }, []);



    const Url = 
    `https://quizapi.io/api/v1/questions?apiKey=vVrNukhRrRlwAFZsUkwgRR7UxMyWWrswSowKyAFb&category=${quizTag}`


    const getQuiz = async()=>{

        await axios.get(Url)
        .then(res=>{ 
        
        console.log(res.data);
       
           
         })
        .catch(err=>{
            console.log(err);  
        })
    }


    return (
        <Grid container justifyContent="center" flex flexDirection="column">
           {/* <Grid container justifyContent="center" alignItems="center" border="solid black" maxWidth="md" height="150px">
               <Typography>{list[0].question}</Typography>
           </Grid> */}
           {/* <Grid item>
               {oferredAnnswers.map((ans,idx)=>{
                 return (<Button key={idx} variant='contained' style={{'margin':'10px'}}>{ans}</Button>)
             })}  
        
           </Grid> */}
             
        
        </Grid>
    )
}
