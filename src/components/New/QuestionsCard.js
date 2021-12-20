
import { Grid, Typography } from '@mui/material';

const QuestionsCard = ({question}) => {

    return (
        <Grid item justifyContent="center" alignItems="center" xs={12} md={4} sm={6}>
            <Typography>
                {question}
            </Typography>
        </Grid>
    )
}

export default QuestionsCard
