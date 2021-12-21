import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'
import { Link } from '@mui/material';

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
        backgroundColor: "#e3f2fd"
    },
    container_background:{
        backgroundColor: "#cfd8dc"
    },
    button:{
        marginBottom: "20px"
    }
  });


const HomePage = () => {

    const classes = useStyles()
        
    return (
        <Grid className={classes.container_background} container justifyContent="center" alignItems="center" height="100vh" maxWidth="md" bacground="blue">
            <Grid className={classes.heading} justifyContent="center" alignItems="center" marginBottom="200px" container xs={8} >
                <Grid item padding="80px"> 
                    <Typography  variant='h5'>
                        CHECK YOUR KNOWLEDGE
                    </Typography>
                </Grid>
                <Link className={classes.link} href="http://localhost:3000/categories">
                    <Button className={classes.button} variant='contained'>START YOUR QUIZZ</Button>
                </Link>
                
            </Grid>
            
        </Grid>
  
    )
}

export default HomePage
