import { Grid, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles'
import Image from "../images/docker-svgrepo-com.svg"


const useStyles = makeStyles({
    card_container: {
        boxShadow: "20px black"
    },
    quizz_card : {
        width: "170px",
        height: "170px",
       
        backgroundSize: "contain"
    }
  });

const CategoryCard = () => {

    const classes = useStyles()


  return <Grid className={classes.card_container} container alignItems="center" display="flex" flexDirection="column" width="200px" padding="10px">
            <Grid item className={classes.quizz_card} style={{"backgroundImage": `url(${Image})`}}/>
            <Grid item >
                <Grid container marginTop="20px">
                    <Typography>
                        Docker
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
        
};

export default CategoryCard;
