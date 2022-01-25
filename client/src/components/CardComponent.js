import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import { useDispatch } from 'react-redux';
import { deleteQuiz } from '../store/delete-quiz-slice';


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
    },
    card: {
        border: " 2px solid grey",
        // margin: "0px",
        padding: "0px",
        height: "max-content"
    }
  });

export default function CardComponent({token, category, score, id}) {

  const dispatch = useDispatch()

    const classes = useStyles()



    const handleDelete = (event) => {
      console.log(event.target.id);
      console.log(token);
      const quizId = {id: event.target.id}
     
      dispatch(deleteQuiz({ token, quizId })) 
      
    }

  return (
    <Card sx={{ minWidth: 220 }} className={classes.card} >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Category
        </Typography>
        <Typography variant="h5" component="div">
        {category}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {score}
        </Typography>
        <Typography variant="body2">
          You are master!!!
        </Typography>
      </CardContent>
      <CardActions>
        <Button id={id} size="small" onClick={handleDelete}>DELETE RESULT</Button>
      </CardActions>
    </Card>
  );
}
