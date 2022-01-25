import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'
import {Link} from "react-router-dom"
import Image from "../images/background.png"

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
        opacity: 0.8,
        '&:hover':{opacity: 1 }

    },
    heading_text:{
        fontFamily: "sans-serif"
    },
    container_background:{
        backgroundImage: `url(${Image})`
    },
    button:{
        marginBottom: "20px",
        opacity: 1
    }
  });


const HomePage = () => {

    const classes = useStyles()
        
    return (
        <Grid className={classes.container_background} container justifyContent="center" alignItems="center" height="100vh">
            <Grid className={classes.heading} justifyContent="center" alignItems="center" marginBottom="200px" container xs={8} >
                <Grid item padding="80px"> 
                    <Typography className={classes.heading_text} variant='h5'>
                        CHECK YOUR KNOWLEDGE
                    </Typography>
                </Grid>
                <Grid item className={classes.button}>
                    <Link className={classes.link} to="/categories">
                     <Button variant='contained'>START YOUR QUIZZ</Button>
                    </Link> 
                </Grid>
            </Grid>
            
        </Grid>
  
    )
}

export default HomePage
