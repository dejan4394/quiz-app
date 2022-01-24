import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';

import { Button } from '@mui/material';
import { useSelector } from 'react-redux';



const useStyles = makeStyles({
    buttonBackGround:{
        background: "green"
    },
    answers:{
        width:"fill-available"
    }
  });




const AnswerButton = ({ 
    buttonText,
     onClick,
      name,
       id,
        currentQuestion }) => {

    
    const classes = useStyles()

    const givenAnswersArray = useSelector( state => state.new_answers.givenAnswersArray )
    
    const [ clicked, setClicked ] = useState( false )
    
 
    //===HANDLE CLICK=====================
    const handleClick = (event) => {
        setClicked(!clicked)
        onClick(event)
    }
    //====================================

  return <Button 
            className={classes.answers}
            variant={givenAnswersArray[currentQuestion].answers.includes(name)  ? "contained" : "outlined"} 
            onClick={handleClick}
            name={name}
            id={id}
            >
            {buttonText}
        </Button>;
};

export default AnswerButton;
