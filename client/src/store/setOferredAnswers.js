

import { generatedQuizzActions } from "./set-generated-quizz";

export const setCorrectAnswers = (generatedQuizz)=>{


    console.log('answers');

return async (dispatch) => {
  

const correctAnswers = generatedQuizz.map( item =>

            Object.keys(item.correct_answers).map((answer, idx) =>{
                                    
            const correct_answer = item.correct_answers[answer];
            
            if(correct_answer !== 'false')
                return answer
            
        }
        )
    )

console.log(correctAnswers);
dispatch(generatedQuizzActions.setGeneratedQuizzAnswers({
    answers: correctAnswers
}))
        
}    
}