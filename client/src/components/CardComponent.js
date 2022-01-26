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
    card: {
        border: " 2px solid grey",
        padding: "0px",
        height: "max-content",
        weight: "200px"
        
    }
  });

export default function CardComponent({token, category, score, id, grade}) {

  const dispatch = useDispatch()

    const classes = useStyles()



    const handleDelete = (event) => {
      console.log(event.target.id);
      console.log(token);
      const quizId = {id: event.target.id}
     
      dispatch(deleteQuiz({ token, quizId })) 
      
    }

  return (
    <Card className={classes.card} sx={{ minWidth: 250 }}>
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
          Your grade is : {grade}
        </Typography>
      </CardContent>
      <CardActions>
        <Button id={id} size="small" onClick={handleDelete}>DELETE RESULT</Button>
      </CardActions>
    </Card>
  );
}
