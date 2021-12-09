import React from 'react'
import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import "../App.css"
import Button from '@mui/material/Button';
import { useParams } from 'react-router';
import "@fontsource/roboto";
import { Grid, Typography } from '@mui/material';
import Questions from '../components/Questions';
import FormData from 'form-data';


const ChosenQuiz = () => {

    //Get data from child component Questions.js----
    const [ data, setData ]  = useState({})

    const callback = useCallback((givenAnswer) => {
       setData(givenAnswer)
      }, []);
    
    //---------------------------------

    
    const [ list, setList ] = useState([])
    const [ questions, setQuestions ] = useState([])
    const [ offeredAnswers, setOfferedAnswers ] = useState([])
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
        setQuestions(res.data.map(item=>{
            return (item.question)
        }))
        setOfferedAnswers(res.data.map(item=>{
            return (item.answers)
        }))
        console.log(res.data);
        console.log(questions);
        })
        .catch(err=>{
            console.log(err);  
        })
    }

   

        const handleSubmit = ()=>{
            console.log(offeredAnswers);
            console.log("Sends POST Request to the server")
            console.log(data);
            const formData = new FormData();
            formData.append('user', data.user)
            formData.append('answers', data.answers)
            formData.append('questions', questions)
            formData.append('offeredAnswers', JSON.stringify(offeredAnswers))
            
    
            axios({
                method: "post",
                url: "http://localhost:5000/results/",
                data:formData,
                headers: { "Content-Type": "multipart/form-data" } ,
              })
                .then((res) => {
                        console.log(res);
                    })
                .catch(function (response) {
                  console.log(response);
                });
        }
    

    return (
        <> 
        <Grid container justifyContent="center" margin="10px 0">
        <Typography variant="h2">
            {category} QUIZ
        </Typography>
        </Grid>         
        <Questions list={list} handleSubmit={handleSubmit} parentCallback={callback}/>
        
        </>
    )
}

export default ChosenQuiz
