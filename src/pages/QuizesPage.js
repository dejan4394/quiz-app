import React from 'react'
import Button from '@mui/material/Button';
import "../App.css"
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';



const QuizesPage = () => {


    return (
            <>
            <Grid margin="50px 0" container justifyContent="center">
            <Typography variant="h3">
            CHOSE YOUR QUIZ
            </Typography>
            </Grid>
            
            <Grid container spacing="20" justifyContent="center">
                <Grid container justifyContent="center" item lg="4" xs={12} sm={6}>
                    <Link to="/chosen-quiz/linux&limit=5&tags=Linux/LINUX">
                    <Button style={{ width: '150px', height: '150px' }} variant="contained" >Linux</Button>
                    </Link>
                </Grid>
                <Grid container justifyContent="center" item lg="4" xs={12} sm={6}>
                    <Link to="/chosen-quiz/bash&limit=5&tags=BASH/BASH">
                    <Button style={{ width: '150px', height: '150px' }} variant="contained" >BASH</Button>
                    </Link>
                </Grid>
                <Grid container justifyContent="center" item lg="4" xs={12} sm={6}>
                    <Link to="/chosen-quiz/docker&limit=5/DOCKER">
                    <Button style={{ width: '150px', height: '150px' }} variant="contained" >Docker</Button>
                    </Link>
                </Grid>
                <Grid container justifyContent="center" item lg="4" xs={12} sm={6}>
                    <Link to="/chosen-quiz/sql&limit=5/SQL">
                    <Button style={{ width: '150px', height: '150px' }} variant="contained" >MySQL</Button>
                    </Link>
                </Grid>
                <Grid container justifyContent="center" item lg="4" xs={12} sm={6}>
                    <Link to="/chosen-quiz/HTML">
                    <Button style={{ width: '150px', height: '150px' }} variant="contained" >HTML</Button>
                    </Link>
                </Grid>
                <Grid container justifyContent="center" item lg="4" xs={12} sm={6}>
                    <Link to="/chosen-quiz/PHP">
                    <Button style={{ width: '150px', height: '150px' }} variant="contained" >PHP</Button>
                    </Link>
                </Grid>
                
                
            </Grid>
            </>

     
    )
}

export default QuizesPage
