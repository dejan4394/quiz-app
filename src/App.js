import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Container } from "@mui/material";
import Notification from "./components/Notification.js";
import NavBar from "./components/NavBar.js"
import Categories from "./pages/Categories.js"
import SignUp from "./pages/SignUp.js"
import SignIn from "./pages/SignIn.js";
import HomePage from "./pages/HomePage";
import UseToken from "./UseToken.js";
import { useState, useEffect } from "react";
import Profile from "./pages/Profile.js";
import { useSelector, useDispatch } from "react-redux"
import axios from "axios";
import { uiActions } from "./store/ui-slice.js"
import { submitResult } from "./store/new-quiz-slice"
import BasicModal from "./components/Modal.js";

let isInitial = true


function App() {

  const dispatch = useDispatch()
  const newQuizData = useSelector( state => state.new_quiz )
  console.log(newQuizData);

  // const notification = useSelector( state => state.ui.notification )
  const open = useSelector(state => state.ui.showModal)

  
  const { token, setToken } = UseToken()

  const [ data, setData ] = useState()
  console.log(data);


  useEffect(() => {

    //PREVENT SENDING REQ ON EACH LOADING OF THE PAGE========
    if(isInitial){
      isInitial = false
      return;
    }
    //=======================================================


    dispatch(submitResult({newQuizData, token}))
            
  }, [newQuizData])

  return (
    <Container maxWidth="md">
    
    <BrowserRouter>
    {open && <BasicModal/>}
    <NavBar token={token}/>
            <Routes>
            <Route exact path="/" element={<HomePage />}/>  
            <Route exact path="/categories" element={!token ? <SignUp setToken={setToken} /> : <Categories token={token}/>}/>  
            <Route exact path="/login" element={<SignIn setData={setData} setToken={setToken} />}/>  
            <Route exact path="/signup" element={<SignUp setToken={setToken}/>}/>  
            <Route exact path="/profile" element={<Profile token={token}/>}/>  
            </Routes>  
    </BrowserRouter>
    </Container>
  );
}

export default App;
