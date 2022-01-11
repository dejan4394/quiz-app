import React, {useState} from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { newQuizActions } from '../store/new-quiz-slice';


const useStyles = makeStyles({
    link: {
      color: 'white',
      textDecoration: "none"
    },
    link_menu: {
      textDecoration: "none"
    },
    heading:{
        border:"2px solid #2196f3",
        borderRadius: "5px",
        backgroundColor: "#e3f2fd",
        padding: "30px"
    },
    container_background:{
        backgroundColor: "#cfd8dc"
    },
    button:{
        marginBottom: "20px"
    },
    answers:{
        width:"fill-available"
    }
  });


export const GenerateQuizzButton = ({category, difficulty, ammount, token}) => {

    const dispatch = useDispatch()

    console.log(token);

    const classes = useStyles()

    const [ generatedQuizz, setGeneratedQuizz ] = useState([])
    const [ currentQuestion, setCurrentQuestion ] = useState(0)
    const [ innitialScore, setInnitialScore ] = useState(0)
    const [ showScore, setShowScore ] = useState(false)
    const [ finalScore, setFinalScore ] = useState(0)
    const [ data, setData ] = useState({
        quizz_name: String,
        difficulty: String,
        score: String
    })
    

    const handleGenerate= async(event)=>{
        
        event.preventDefault()
        setShowScore(false)
        setCurrentQuestion(0)
        setFinalScore(0)
        setInnitialScore(0)
        console.log(category+difficulty+ammount);

        let apiUrl = `https://quizapi.io/api/v1/questions?apiKey=vVrNukhRrRlwAFZsUkwgRR7UxMyWWrswSowKyAFb&limit=${ammount}`;
           
        
        if (ammount.length>1) {
        apiUrl = apiUrl.concat(`&limit=${ammount}`)
        }
        if (category.length) {
        apiUrl = apiUrl.concat(`&category=${category}`)
        }
        if (difficulty.length) {
        apiUrl = apiUrl.concat(`&difficulty=${difficulty}`)
        }

        console.log(apiUrl);

        await fetch(apiUrl)
        .then((res) => res.json())
        .then((response) => {
            setGeneratedQuizz(response)
            console.log(generatedQuizz);
        });

        console.log(generatedQuizz);
                
    }

    

    const handleNextQuestion = (event)=>{
       
        const correctAnswer = event.target.name
        const givenAnswer = event.target.id

        const score = innitialScore + 1;

        givenAnswer === correctAnswer && setInnitialScore(score);
        console.log(`Your score is: ${score}/${generatedQuizz.length}`)

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < generatedQuizz.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setFinalScore(innitialScore+1);
            setShowScore(true)
            setData({
                quizz_name: generatedQuizz[0].category,
                difficulty: generatedQuizz[0].difficulty,
                score: `${score} /${generatedQuizz.length}` 
            })
            console.log(finalScore);
            
        }
    }

            
    const submitAnswers = (event)=>{
        setShowScore(false)
        event.preventDefault()
        dispatch(newQuizActions.saveNewQuiz({
            quizz_name: data.quizz_name,
            difficulty: data.difficulty,
            score: data.score
        }))

        console.log(data);

    }

    return (
        <Grid container justifyContent="center">
            <Grid item marginTop="20px">
                <Button className={classes.button} variant='contained' onClick={handleGenerate}>generate quizz</Button>
            </Grid>
                {!showScore ? generatedQuizz.length > 0 &&
                <Grid container justifyContent="center" display="flex" flexDirection="column">
                    <Grid className={classes.heading} container justifyContent="center" >
                        <Typography>{generatedQuizz[currentQuestion].question}</Typography>
                    </Grid>
                    
                    <Grid container justifyContent="center" display="flex" flexDirection="column">
                        {Object.keys(generatedQuizz[currentQuestion].answers).map(item =>{
                            const answer = generatedQuizz[currentQuestion].answers[item];
                            if( answer !== null){
                                return(<Grid item marginTop="21px">
                                            <Button 
                                                className={classes.answers}
                                                name={generatedQuizz[currentQuestion].correct_answer} 
                                                id={item} onClick={handleNextQuestion} 
                                                variant='contained'>
                                            { answer }
                                            </Button>
                                        </Grid>)}}
                        )}
                    </Grid> 
                </Grid>
                 : <Grid container justifyContent="center" display="flex" flexDirection="column">
                        <Grid container justifyContent="center">
                            <Typography padding="70px">{`Your score is: ${finalScore}/${generatedQuizz.length}`}</Typography>
                        </Grid>
                        <Button type='submit' variant='contained' on onClick={submitAnswers}>submit score</Button>
                    </Grid>}
                
        </Grid>
    )
}
