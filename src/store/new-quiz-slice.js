import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./ui-slice";
import axios from "axios";



const newQuizSlice = createSlice({
    name: 'new_quiz',
    initialState: {
        newQuiz : null
    },
    reducers: {
        saveNewQuiz( state, action ) {
            state.newQuiz = {
                quizz_name : action.payload.quizz_name,
                difficulty : action.payload.difficulty,
                score : action.payload.score
        }
        }
    }
})


//===REDUX THUNK=================================================================================

export const submitResult = ({newQuizData, token}) => {
    return async (dispatch) => {
      
            
      
            const answers = await axios({
                  method: "post",
                  url: "/results",
                  data:newQuizData.newQuiz,
                  headers: {  "Authorization" : `${token}`,
                              "Content-Type": "application/json",
                              'Access-Control-Allow-Origin': 'http://localhost:3000'
                            }
                })
                  .then((response) => {
                    console.log(response.data);
                    console.log(response.data.message);
                    dispatch(uiActions.responseFromServer({
                        message: response.data.message
                    }))

                      if(response.data.success===true){
                          return dispatch(uiActions.setModal({
                            show: true
                        }))
                      }
                          
                          
                      })
                      
                  .catch((response)=>{
                    console.log(response);
                  })

    }
}
//===============================================================================================

export const newQuizActions = newQuizSlice.actions

export default newQuizSlice