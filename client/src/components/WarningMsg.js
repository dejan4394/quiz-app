import React from 'react'
import { Typography } from '@mui/material'

const WarningMsg = ({message}) => {
    return (
        <Typography variant='h6'>
            {message}
        </Typography>
    )
}

export default WarningMsg
