import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Container } from "@mui/material";
import NavBar from "./components/NavBar.js"
import Categories from "./pages/Categories.js"
import SignUp from "./pages/SignUp.js"
import SignIn from "./pages/SignIn.js";
import HomePage from "./pages/HomePage";
import UseToken from "./UseToken.js";
import { useState, useEffect } from "react";
import Profile from "./pages/Profile.js";
import { useSelector } from "react-redux"
import axios from "axios";

let isInitial = true


function App() {

  const newQuizData = useSelector( state => state.new_quiz )
  console.log(newQuizData);
  
  
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

    
    axios({
            method: "post",
            url: "/results",
            data:newQuizData.newQuiz,
            headers: {  "Authorization" : `${token}`,
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': 'http://localhost:3000'}
          })
            .then((response) => {
                    console.log(response);
                    console.log(response.data.message);
                })
                
            .catch(function (response) {
              console.log(response);
            });


            
  }, [newQuizData])

  return (
    <Container maxWidth="md">
    
    <BrowserRouter>
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
