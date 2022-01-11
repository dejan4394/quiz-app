import { Grid, Typography } from '@mui/material'
import React from 'react'
import QuizCategoryCard from './QuestionsCard';

const QuizCategoryComponent = ({quizzData}) => {

    console.log(quizzData);

    const displayQuizzes = (data)=>{

        if(data.length > 0){
            return(
                
                data.map((item, idx)=>{
                    return(
                    <QuizCategoryCard  name={item.category} link="/"/>
                    )
                }
                )
            )}}

            

    return (
        <Grid container rowSpacing={5} width="auto" margin="0" spacing={4} justifyContent="center">
            <Grid margin="50px 0" container justifyContent="center">
                <Typography variant="h3">
                CHOSE YOUR QUIZ
                </Typography>
            </Grid>
            {displayQuizzes(quizzData)}
        </Grid>
         
    )
}

export default QuizCategoryComponent;
