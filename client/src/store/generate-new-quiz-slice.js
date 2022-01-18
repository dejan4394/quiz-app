

import { generatedQuizzActions } from "./set-generated-quizz";


export const fetchNewQuizz = ({ammount, category, difficulty})=>{

        console.log('sranje');

  return async (dispatch) => {
      
    // event.preventDefault()
    // setShowScore(false)
    // setCurrentQuestion(0)
    // setFinalScore(0)
    // setInnitialScore(0)
    // console.log(category+difficulty+ammount);

    console.log('sranje1');
               
            let apiUrl = `https://quizapi.io/api/v1/questions?apiKey=BAfukmGyFOYC8hriMKiqE3sD1tIVSu9QuQgKOHFU&limit=${ammount}`;
            
            
            if (ammount.length>1) {
            apiUrl = apiUrl.concat(`&limit=${ammount}`)
            }
            if (category.length) {
            apiUrl = apiUrl.concat(`&category=${category}`)
            }
            if (difficulty.length) {
            apiUrl = apiUrl.concat(`&difficulty=${difficulty}`)
            }

            console.log(apiUrl);



            await fetch(apiUrl)
            .then((res)=> res.json())
            .then((response) => {
                console.log(response);
                dispatch(generatedQuizzActions.setGeneratedQuizz({
                    generatedQuizz: response
                }))
                
                // setGeneratedQuizz(response)
                // console.log(generatedQuizz);
            });

        
            
}
 
            
}

