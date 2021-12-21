import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Container } from "@mui/material";
import NavBar from "./components/NavBar.js"
import Categories from "./pages/Categories.js"
import SignUp from "./pages/SignUp.js"
import SignIn from "./pages/SignIn.js";
import HomePage from "./pages/HomePage";
import { QuizPage } from "./pages/QuizPage";




function Application() {
  return (
    <Container maxWidth="md">
    
    <BrowserRouter>
    <NavBar />
            <Routes>
            <Route exact path="/" element={<HomePage />}/>  
            <Route exact path="/categories" element={<Categories/>}/>  
            <Route exact path="/quiz-page/:id/:category" element={<QuizPage />}/>   
            <Route exact path="/login" element={<SignIn />}/>  
            <Route exact path="/signup" element={<SignUp />}/>  
            </Routes>  
    </BrowserRouter>
    </Container>
  );
}

export default Application;
