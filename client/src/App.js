import React, { Suspense } from "react";

import { Route, Routes} from "react-router-dom"
import { Container } from "@mui/material";
import NavBar from "./components/NavBar.js"

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"

import { tokenActions } from "./store/token-slice.js";
import { submitResult } from "./store/new-answers-slice"
import BasicModal from "./components/Modal.js";
import About from "./pages/About.js";

const HomePage = React.lazy( () => import("./pages/HomePage") )
const Profile = React.lazy( () => import("./pages/Profile") )
const Categories = React.lazy( () => import("./pages/Categories"))
const SignUp = React.lazy( () => import("./pages/SignUp") )
const SignIn = React.lazy( () => import("./pages/SignIn") )

let isInitial = true


function App() {
  

  const dispatch = useDispatch()

  const newQuizData = useSelector( state => state.new_answers.newQuizGivenAnswers )

  const tokenStr = useSelector( state=> state.token.token_string )

  const modal = useSelector(state => state.ui.modal.showModal)
  


  useEffect(() => {

    dispatch(tokenActions.saveToken({
      token_string : sessionStorage.getItem('token')
  }))
    //PREVENT SENDING REQ ON EACH LOADING OF THE PAGE========
    if(isInitial){
      isInitial = false
      return;
    }
    //=======================================================


    dispatch(submitResult({newQuizData, tokenStr}))
            
  }, [newQuizData])

  return (
    <Container maxWidth="md">
    <Suspense fallback={<BasicModal/>}>
    
    {modal && <BasicModal/>}
    <NavBar token={tokenStr}/>
            <Routes>
              <Route exact path="/" element={<HomePage />}/>
              <Route exact path="/categories" element={!tokenStr ? <SignUp /> : <Categories token={tokenStr}/>}/>  
              <Route exact path="/login" element={<SignIn />}/>  
              <Route exact path="/signup" element={<SignUp />}/>  
              <Route exact path="/profile" element={<Profile token={tokenStr}/>}/>  
              <Route exact path="/cards" element={<About />}/> 
            </Routes>  
  
    </Suspense>
    
    </Container>
  );
}

export default App;
