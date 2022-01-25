
import { newAnswersActions } from "./new-answers-slice";


export const createGivenAnswersArray = (response)=>{


            console.log('CREATING GIVEN ANSWERS ARRAY!!!');

        return async (dispatch) => {
        
            const emptyArray = response.map( item => {
                return {
                    "id": item.id,
                    "answers": []
                    }
            })

            console.log('GIVEN ANSWERS ARRAY :');
            console.log(emptyArray);
         
         dispatch(newAnswersActions.setGivenAnwersArray(
            emptyArray
        ))   
         
        }  


}


export const handleGivenAnswers = (chosenAnswersArray, idx, givenAnswersArray)=>{


    return (dispatch) => {

        const elementsIndex = givenAnswersArray.findIndex(element => element.id == idx )

        const newArray = [...givenAnswersArray]

        newArray[elementsIndex] = {...newArray[elementsIndex], answers: chosenAnswersArray}

        console.log('UPDATED ANSWERS ARRAY : ');
        console.log(newArray);

        dispatch(newAnswersActions.setGivenAnwersArray(
          newArray
        ))

        
}    
}
