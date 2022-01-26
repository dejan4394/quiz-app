import React, {useState, useEffect} from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';


import { useDispatch, useSelector } from 'react-redux';
import { newAnswersActions } from '../store/new-answers-slice';
import { fetchNewQuizz } from '../store/generate-new-quiz-slice';
import { handleGivenAnswers } from '../store/handle-given-answers';
import AnswerButton from './AnswerButton';


let isInitial = true


const useStyles = makeStyles({
    heading:{
        border:"2px solid #2196f3",
        borderRadius: "5px",
        backgroundColor: "#e3f2fd",
        padding: "30px"
    },
    button:{
        marginBottom: "20px"
    },
    answers:{
        width:"fill-available"
    },
    question_info: {
        borderRadius: "5px",
        background: "#2e91d1",
        marginBottom: "10px",
        padding: "0px 10px"
    },
    quizz_container: {
        background: "white",
        padding: "50px",
        
        border: "2px solid dodgerblue",
    }
  });


export const GenerateQuizzButton = ({category, difficulty, ammount}) => {

    const dispatch = useDispatch()

    const classes = useStyles()


    const givenAnswersArray = useSelector( state => state.new_answers.givenAnswersArray )
    const generatedQuizzAnswers = useSelector( state => state.generated_quizz.generatedQuizzAnswers )
    const generatedQuizz = useSelector(state => state.generated_quizz.generatedQuizz)

    const [ currentQuestion, setCurrentQuestion ] = useState(0)
    const [ showScore, setShowScore ] = useState(false)
    const [ finalScore, setFinalScore ] = useState(0)
    const [ data, setData ] = useState({
        quizz_name: String,
        difficulty: String,
        score: String,
        grade: String
    })

    const [ chosenAnswersArray, setChosenAnswersArray ] = useState([])

    
    //===REFRESH THE STATE OF THE GIVEN ANSWERS ARRAY=============================================================
    useEffect(() => {

        if(isInitial){
          isInitial = false
          return;
        }
    
        if( givenAnswersArray.length > 0 )  
        dispatch(handleGivenAnswers(chosenAnswersArray, givenAnswersArray[currentQuestion].id, givenAnswersArray))
                
      }, [chosenAnswersArray])

    //============================================================================================================

    //===GENERATE THE QUIZZ========================================
    const handleGenerate= (event)=>{
        event.preventDefault()

        dispatch(fetchNewQuizz({category, difficulty, ammount}))
        
        setShowScore(false)
        setCurrentQuestion(0)
        setFinalScore(0)
        setChosenAnswersArray([])
        
    }

    
    //===HANDLE THE ANSWERS===============================================
    const handleAnswer = (event)=>{

        const givenAnswer = event.target.name

        if( !chosenAnswersArray.includes(givenAnswer)){
            setChosenAnswersArray(prev=>
            [...prev, givenAnswer]
        )
        }else{
            setChosenAnswersArray(
                chosenAnswersArray.filter( (item) =>{ return item !== givenAnswer} )
            )
        }
        
    }
    //==============================================================================



    //===NEXT QUESTION======================================

    const handleNext = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < generatedQuizz.length) {

            setCurrentQuestion(nextQuestion);

            setChosenAnswersArray(givenAnswersArray[currentQuestion+1].answers)
        }

        dispatch(handleGivenAnswers(chosenAnswersArray, givenAnswersArray[currentQuestion].id, givenAnswersArray))
      
    }
    //======================================================


    //===PREVIOUS QUESTION==================================

    const handlePrev = () => {
        const nextQuestion = currentQuestion - 1;
        if (nextQuestion >= 0) {
            setCurrentQuestion(nextQuestion);

            setChosenAnswersArray(givenAnswersArray[currentQuestion-1].answers)

        }

        dispatch(handleGivenAnswers(chosenAnswersArray, givenAnswersArray[currentQuestion].id, givenAnswersArray))

    }
    //=======================================================


    //===SUBMIT / CHECK SCORE================================

    const submit = () => {

        console.log("CHECKING YOUR SCORE!!!");
        

        const finalScore = givenAnswersArray.map( (item, idx) =>{
                if(item.answers.length > 0){
                     if(item.answers.every( e => generatedQuizzAnswers[idx].answers.includes(e)))
                     {return 'true'}else{ return 'false' }
                }else{ return 'false' }
        })
        console.log(finalScore);

        const trueAnswers = finalScore.filter( ans => ans === 'true' ).length
        console.log(trueAnswers);

        setFinalScore(trueAnswers)
        console.log(`Your score is: ${trueAnswers}/${generatedQuizz.length}`)

        const percent = (trueAnswers / generatedQuizz.length) * 100
        console.log(percent);

        let gradeWon = ""

        if(percent < 66) {gradeWon = "F"}
        else if(percent > 66 && percent <= 74) {gradeWon = "D"}
        else if(percent > 74 && percent <= 84) {gradeWon = "C"}
        else if(percent > 84 && percent <= 92) {gradeWon = "B"}
        else {gradeWon = "A"}
        

        console.log(gradeWon);

        setData({
                    quizz_name: generatedQuizz[0].category,
                    difficulty: generatedQuizz[0].difficulty,
                    score: `${trueAnswers} /${generatedQuizz.length}`,
                    grade: gradeWon 
                })

        setShowScore(true)
    }
    //=======================================================


    //===SEND ANSWERS TO THE BACKEND=======================        
    const submitAnswers = (event)=>{

        event.preventDefault()
        
        dispatch(newAnswersActions.saveNewAnswers({
            quizz_name: data.quizz_name,
            difficulty: data.difficulty,
            score: data.score,
            grade: data.grade
        }))
        
        console.log('GIVEN ANSWERS SAVED INTO REDUX!!!');
    }


    
    return (
        <Grid container justifyContent="center">
            <Grid item marginTop="20px">
                <Button className={classes.button} variant='contained' onClick={handleGenerate}>generate new quizz</Button>
            </Grid>
                {!showScore ? generatedQuizz.length > 0 &&
                <Grid className={classes.quizz_container} container justifyContent="center" display="flex" flexDirection="column">
                    <Grid className={classes.question_info} container display="flex" justifyContent="space-between">
                        <Typography>
                            {`Difficulty : ${generatedQuizz[0].difficulty}`}
                        </Typography>
                        <Typography>
                            {`Category : ${generatedQuizz[0].category}`}
                        </Typography>
                        <Typography>
                            {`Question : ${currentQuestion + 1} / ${generatedQuizz.length}`}
                        </Typography>
                    </Grid>
                    <Grid className={classes.heading} container justifyContent="center" >
                        <Typography>{generatedQuizz[currentQuestion].question}</Typography>
                    </Grid>
                    
                    <Grid container justifyContent="center" display="flex" flexDirection="column">
                        {Object.keys(generatedQuizz[currentQuestion].answers).map((item, idx) =>{
                            
                            const answerText = generatedQuizz[currentQuestion].answers[item];
                            const answer = Object.keys(generatedQuizz[currentQuestion].correct_answers)[idx]

                            if( answerText !== null){
                                return(<Grid key={idx} item marginTop="21px">
                                            <AnswerButton 
                                                currentQuestion={currentQuestion}
                                                name={answer} 
                                                id={idx} 
                                                onClick={handleAnswer} 
                                                buttonText ={answerText}
                                                >
                                            </AnswerButton>
                                        </Grid>)}}
                        )}
                    </Grid> 
                    <Grid container justifyContent="space-around" margin="20px 0px 20px 0px">
                        <Button variant='contained' onClick={handlePrev}>Prev</Button>
                        <Button variant="outlined" onClick={submit}>Submit</Button>
                        <Button variant='contained' onClick={handleNext}>Next</Button>
                    </Grid>
                </Grid>
                 : <Grid className={classes.quizz_container} container justifyContent="center" display="flex" flexDirection="column">
                        <Grid container justifyContent="center">
                            <Typography padding="70px">{`Your score is: ${finalScore}/${generatedQuizz.length}`}</Typography>
                        </Grid>
                        <Button type='submit' variant='contained' on onClick={submitAnswers}>submit score</Button>
                    </Grid>}
                
        </Grid>
    )
}
