import { createSlice } from "@reduxjs/toolkit";

import { serverResponseActions } from "./responses-from-server-slice";
import { uiActions } from "./ui-slice";
import axios from "axios";



const newAnswersSlice = createSlice({
    name: 'new_answers',
    initialState: {
        newQuiz : null,
        givenAnswersArray: []
    },
    reducers: {
        setGivenAnwersArray (state, action) {
            state.givenAnswersArray = action.payload
        },
        saveNewAnswers( state, action ) {
            console.log("jfoef");
            state.newQuiz = {
                quizz_name : action.payload.quizz_name,
                difficulty : action.payload.difficulty,
                score : action.payload.score
        }
        }
    }
})


//===REDUX THUNK/ SUBMI NEW RESULTS=================================================================================

export const submitResult = ({newQuizData, tokenStr}) => {
    console.log(newQuizData);

    return async (dispatch) => {
      
            const answers = await axios({
                  method: "post",
                  url: "/quizes",
                  data:newQuizData,
                  headers: {  "Authorization" : `${tokenStr}`,
                              "Content-Type": "application/json",
                              'Access-Control-Allow-Origin': 'http://localhost:3000'
                            }
                })
                  .then((response) => {
                    console.log(response.data);
                    console.log(response.data.message);
                    dispatch(serverResponseActions.messageFromServer({
                        message: response.data.message
                    }))

                      if(response.data.success===true){
                          return dispatch(uiActions.setModal({
                            show: true,
                            displayFirstButton : 'unset',
                            textFirstButton : 'go to profile',
                            displaySecondButton: 'unset',
                            textSecondButton: 'probaj pak'
                        }))
                      }
                      })
                      
                  .catch((response)=>{
                    console.log(response);
                  })

    }
}
//===============================================================================================

export const newAnswersActions = newAnswersSlice.actions

export default newAnswersSlice