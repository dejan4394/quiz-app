import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Container } from "@mui/material";
import NavBar from "./components/NavBar.js"
import Categories from "./pages/Categories.js"
import SignUp from "./pages/SignUp.js"
import SignIn from "./pages/SignIn.js";
import HomePage from "./pages/HomePage";

import { useEffect } from "react";
import Profile from "./pages/Profile.js";
import { useSelector, useDispatch } from "react-redux"


import { tokenActions } from "./store/token-slice.js";
import { submitResult } from "./store/new-quiz-slice"
import BasicModal from "./components/Modal.js";

let isInitial = true


function App() {

  const dispatch = useDispatch()

  const newQuizData = useSelector( state => state.new_quiz )
  console.log(newQuizData);

  const tokenStr = useSelector( state=> state.token.token_string )
  console.log(tokenStr);

  const modal = useSelector(state => state.ui.modal.showModal)
  console.log(modal);


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
    
    <BrowserRouter>
    {modal && <BasicModal/>}
    <NavBar token={tokenStr}/>
            <Routes>
            <Route exact path="/" element={<HomePage />}/>  
            <Route exact path="/categories" element={!tokenStr ? <SignUp /> : <Categories token={tokenStr}/>}/>  
            <Route exact path="/login" element={<SignIn />}/>  
            <Route exact path="/signup" element={<SignUp />}/>  
            <Route exact path="/profile" element={<Profile token={tokenStr}/>}/>  
            </Routes>  
    </BrowserRouter>
    </Container>
  );
}

export default App;
