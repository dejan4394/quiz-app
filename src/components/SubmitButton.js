import React from 'react'
import Button from '@mui/material/Button';


const SubmitButton = ({onClick}) => {
    return (
        <div className="submit-button">
            <Button onClick = {onClick} variant="contained">Submit</Button>
        </div>
    )
}

export default SubmitButton
