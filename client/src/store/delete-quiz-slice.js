import axios from "axios";

import { serverResponseActions } from "./responses-from-server-slice";
import { uiActions } from "./ui-slice";


//===REDUX THUNK/ DELETE REQUEST=================================================================================

export const deleteQuiz = ({token, quizId}) => {
    return async (dispatch) => {
               
            const answers = await axios({
                  method: "post",
                  url: "/quizes/delete",
                  data:quizId,
                  headers: {  "Authorization" : `${token}`,
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
                    dispatch(uiActions.setModal({
                      show: true,
                      displayFirstButton: 'none',
                      displaySecondButton: 'none'
                    }))
                    setTimeout(()=>{
                      dispatch(serverResponseActions.setChanged())},
                       500)

                    })
                    
                  .catch((response)=>{
                    console.log(response);
                  })

    }
}
//===============================================================================================