import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Container } from "@mui/material";
import NavBar from "./components/NavBar.js"
import Categories from "./pages/Categories.js"
import SignUp from "./pages/SignUp.js"
import SignIn from "./pages/SignIn.js";
import HomePage from "./pages/HomePage";
import UseToken from "./UseToken.js";
import { useState } from "react";
import Profile from "./pages/Profile.js";


function Application() {
  
  const { token, setToken } = UseToken()

  const [ data, setData ] = useState()
  console.log(data);
  
  
  console.log(token);

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

export default Application;
