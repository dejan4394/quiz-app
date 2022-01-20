
import { newAnswersActions } from "./new-answers-slice";


export const createGivenAnswersArray = (response)=>{


            console.log('create-given-answers');

        return async (dispatch) => {
        
            const emptyArray = response.map( item => {
                return {
                    "id": item.id,
                    "answers": []
                    }
            })

         console.log(emptyArray);
         
         dispatch(newAnswersActions.setGivenAnwersArray(
            emptyArray
        ))   
         
        }  


}


export const handleGivenAnswers = (chosenAnswersArray, idx, givenAnswersArray)=>{

    console.log('handle-given-answers');


    return (dispatch) => {
    
        // console.log(givenAnswersArray);
        console.log(chosenAnswersArray);
        console.log(idx);

        const elementsIndex = givenAnswersArray.findIndex(element => element.id == idx )


        const newArray = [...givenAnswersArray]

        newArray[elementsIndex] = {...newArray[elementsIndex], answers: chosenAnswersArray}

        console.log(newArray);

        dispatch(newAnswersActions.setGivenAnwersArray(
          newArray
        ))

        
}    
}
