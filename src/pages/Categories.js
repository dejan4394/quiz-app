import React from 'react'
import { Grid } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import QuizzGenerator from '../components//QuizzGenerator.js';

const Categories = () => {
    
    const [ quizzData, setQuizData ] = useState([])
    
    useEffect(() => {
        getQuizzesData()
        console.log(quizzData);
    }, [])




const Url = 'https://quizapi.io/api/v1/questions?apiKey=vVrNukhRrRlwAFZsUkwgRR7UxMyWWrswSowKyAFb&limit=20'

const getQuizzesData = async()=>{

                await axios.get(Url)
                .then(res=>{
                    setQuizData(res.data)
                    console.log(res.data);
                    })  
                .catch(err=>{
                    console.log(err);  
                })
            }

    return (<Grid container display="flex" flexDirection="column">
                <QuizzGenerator quizzData={quizzData}/>
            </Grid>     
    )
}

export default Categories