import React from 'react';
import { useState } from 'react';

import { Button } from '@mui/material';

const AnswerButton = ({ buttonText, onClick, name, id, className }) => {

    const [ clicked, setClicked ] = useState( false )

const handleClick = (event) => {
    setClicked(!clicked)
    onClick(event)
}


  return <Button 
            variant={!clicked ? "contained" : "outlined"} onClick={handleClick}
            className={className}
            name={name}
            id={id}
            >
            {buttonText}
        </Button>;
};

export default AnswerButton;
