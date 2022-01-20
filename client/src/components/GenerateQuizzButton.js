import React, {useState} from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import axios from 'axios'


import { useDispatch, useSelector } from 'react-redux';
import { newAnswersActions } from '../store/new-answers-slice';
import { fetchNewQuizz } from '../store/generate-new-quiz-slice';
import { handleGivenAnswers } from '../store/handle-given-answers';


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


export const GenerateQuizzButton = ({category, difficulty, ammount}) => {

    const dispatch = useDispatch()

    const classes = useStyles()


    const givenAnswersArray = useSelector( state => state.new_answers.givenAnswersArray )
    const generatedQuizzAnswers = useSelector( state => state.generated_quizz.generatedQuizzAnswers )
    const generatedQuizz = useSelector(state => state.generated_quizz.generatedQuizz)
    const [ currentQuestion, setCurrentQuestion ] = useState(0)
    const [ innitialScore, setInnitialScore ] = useState(0)
    const [ showScore, setShowScore ] = useState(false)
    const [ finalScore, setFinalScore ] = useState(0)
    const [ data, setData ] = useState({
        quizz_name: String,
        difficulty: String,
        score: String
    })

    const [ chosenAnswersArray, setChosenAnswersArray ] = useState([])
    


    const handleGenerate= (event)=>{
        event.preventDefault()

        dispatch(fetchNewQuizz({category, difficulty, ammount}))
        
        setShowScore(false)
        setCurrentQuestion(0)
        setFinalScore(0)
        setInnitialScore(0)
        console.log(category+difficulty+ammount);

        console.log(generatedQuizz);
        console.log(generatedQuizzAnswers); 
        console.log(givenAnswersArray);

    }

    

    const handleAnswer = (event)=>{
       
        const idx = event.target.id
        const correctAnswersArray = generatedQuizzAnswers[currentQuestion]
        const givenAnswer = event.target.name
        console.log(correctAnswersArray);
        console.log(givenAnswer);

        if(! chosenAnswersArray.includes(givenAnswer)){
            setChosenAnswersArray(prev=>
            [...prev, givenAnswer]
        )
        }else{
            setChosenAnswersArray(
                chosenAnswersArray.filter( (item) =>{ return item !== givenAnswer} )
            )
        }
        
        console.log(chosenAnswersArray);

        // dispatch(handleGivenAnswers(chosenAnswersArray, currentQuestion, givenAnswersArray))


        // const correctAnswer = event.target.name
        // const givenAnswer = event.target.id

        // const score = innitialScore + 1;

        // givenAnswer === correctAnswer && setInnitialScore(score);
        // console.log(`Your score is: ${score}/${generatedQuizz.length}`)

        
        //     setFinalScore(innitialScore+1);
        //     // setShowScore(true)
        //     setData({
        //         quizz_name: generatedQuizz[0].category,
        //         difficulty: generatedQuizz[0].difficulty,
        //         score: `${score} /${generatedQuizz.length}` 
        //     })
        //     console.log(finalScore);
            
        
    }

    //===NAVIGATE THROUGH QUESTIONS=========================
    const handleNext = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < generatedQuizz.length) {
            
            console.log(currentQuestion);

            console.log(chosenAnswersArray);

            console.log(givenAnswersArray);

            setCurrentQuestion(nextQuestion);

            setChosenAnswersArray([])
        }
        dispatch(handleGivenAnswers(chosenAnswersArray, givenAnswersArray[currentQuestion].id, givenAnswersArray))

        console.log(givenAnswersArray);
    }
    const handlePrev = () => {
        const nextQuestion = currentQuestion - 1;
        if (nextQuestion >= 0) {
            setCurrentQuestion(nextQuestion);
            console.log(currentQuestion);
            
            console.log(givenAnswersArray);
            console.log(givenAnswersArray[currentQuestion]);
        }

        
    }
    //=======================================================



    const submit = () => {
        setShowScore(true)
    }

            
    const submitAnswers = (event)=>{

        event.preventDefault()
        
        dispatch(newAnswersActions.saveNewAnswers({
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
                        {Object.keys(generatedQuizz[currentQuestion].answers).map((item, idx) =>{
                            
                            const answerText = generatedQuizz[currentQuestion].answers[item];
                            const answer = Object.keys(generatedQuizz[currentQuestion].correct_answers)[idx]

                            if( answerText !== null){
                                return(<Grid key={idx} item marginTop="21px">
                                            <Button 
                                                
                                                className={classes.answers}
                                                name={answer} 
                                                id={idx} 
                                                onClick={handleAnswer} 
                                                variant='contained'>
                                            { generatedQuizz[currentQuestion].id + '.  ' + answerText}
                                            </Button>
                                        </Grid>)}}
                        )}
                    </Grid> 
                    <Grid container justifyContent="space-around" margin="20px">
                        <Button variant='contained' onClick={handlePrev}>Prev</Button>
                        <Button variant="outlined" onClick={submit}>Submit</Button>
                        <Button variant='contained' onClick={handleNext}>Next</Button>
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
