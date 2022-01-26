import { generatedQuizzActions } from "./set-generated-quizz";



export const setCorrectAnswers = (generatedQuizz)=>{


    return async (dispatch) => {
    

    const correctAnswers = generatedQuizz.map( item =>

                Object.keys(item.correct_answers).map((answers, idx) =>{
                                        
                const correct_answer = item.correct_answers[answers];
                
                if(correct_answer !== 'false')
                    return {"id": item.id,
                            "answers": [answers]
                    }
                
            }
            )
        )

        const filteredCorrectAnswers = correctAnswers.map( item => {
            const filterred =  item.filter( undefinedItem => undefinedItem !== undefined)
            return filterred
            }
            )

            console.log('CORRECT ANSWERS ARRAY :');
            const objectArray = filteredCorrectAnswers.map(arr => {return arr[0]})
            console.log(objectArray);
            const answersArray = objectArray.map( obj => obj.answers )
            console.log(answersArray);
            
            dispatch(generatedQuizzActions.setGeneratedQuizzAnswers({
                answers: objectArray
            }))
            
    }    
}