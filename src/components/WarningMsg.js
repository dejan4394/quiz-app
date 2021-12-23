import React from 'react'
import { Typography } from '@mui/material'

const WarningMsg = ({message}) => {
    return (
        <Typography variant='h6' color="red">
            {message}
        </Typography>
    )
}

export default WarningMsg
