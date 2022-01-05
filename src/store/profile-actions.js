import axios from "axios";
import serverResponse, { serverResponseActions } from "./responses-from-server-slice";
import { uiActions } from "./ui-slice";

export const getUserData = ({ token, setUserData, setResponseFromServer }) => {

  return async (dispatch) => {
    
    dispatch(uiActions.setShowProgress({  
      progress: true
    }))

    const getData = async () => {

      console.log(token);
        const response = await axios({
              method: "get",
              url: "/results/completed",
              headers: {  "Authorization" : `${token}`,
                          "Content-Type": "application/json",
                          'Access-Control-Allow-Origin': '*'
                        }
            })

          console.log("kdjnbfkjfls");
          const data = response

          return data
          };
          //--------------------------------------------------------------------------
          try {
            const userData = await getData()
            console.log(userData);
            setUserData(userData.data.result)
            setResponseFromServer(userData.data.message)
            dispatch(serverResponseActions.setCompletedQuizes({
              completed_quizes: userData.data.result.completed_quizes
            }))
            dispatch(uiActions.setShowProgress({  
                progress: false
              }))
              dispatch(serverResponseActions.messageFromServer({
                message: 'Welcome!!!'
            }))
              dispatch(uiActions.setModal({
                show: true
              }))
          } catch (error){
              console.log(error);
          }
        }
      }
          