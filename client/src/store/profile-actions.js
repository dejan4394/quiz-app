import axios from "axios";
import { useSelector } from "react-redux";
import { serverResponseActions } from "./responses-from-server-slice";
import { uiActions } from "./ui-slice";

export const getUserData = ({ token, setUserData, setResponseFromServer }) => {


  return async (dispatch) => {

    dispatch(uiActions.setModal({
      show: false
  }))
    
    dispatch(uiActions.setShowProgress({  
      progress: true
    }))

    dispatch(serverResponseActions.setChanged())

    const getData = async () => {

        const response = await axios({
              method: "get",
              url: "/quizes/completed",
              headers: {  "Authorization" : `${token}`,
                          "Content-Type": "application/json",
                          'Access-Control-Allow-Origin': '*'
                        }
            })

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
                show: true,
                displayFirstButton : 'none',
                displaySecondButton: 'none'
              }))
              setTimeout(
                ()=>{dispatch(uiActions.setModal({
                show: false,
              }))}, 1000
              )
              


          } catch (error){
              console.log(error);
          }
        }
      }
          