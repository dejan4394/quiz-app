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

                      if(response.data.success===true){
                           dispatch(uiActions.setModal({
                            show: true
                        }))
                      }

                    dispatch(serverResponseActions.setChanged())
                      })

                      
                      
                  .catch((response)=>{
                    console.log(response);
                  })

    }
}
//===============================================================================================