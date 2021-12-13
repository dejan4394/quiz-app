import React from 'react'
import Button from '@mui/material/Button';


const SubmitButton = ({onClick, children}) => {
    return <Button onClick = {onClick} variant="contained">{children}</Button>
        
    
}

export default SubmitButton
