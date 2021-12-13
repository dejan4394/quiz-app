import {BrowserRouter, Route, Routes} from "react-router-dom"
import Profile from "./pages/Profile";
import QuizesPage from "./pages/QuizesPage";
import "./App.css"
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import ChosenQuiz from "./pages/ChosenQuiz";
import SignUp from "./pages/SignUp";


function App() {
  return (
    <Container maxWidth="md">
    <BrowserRouter>
    <Navbar />
    <div>
    <Routes>
      <Route exact path="/" element={<SignUp />}/>  
      <Route exact path="/welcome" element={<QuizesPage />}/>  
      <Route exact path="/chosen-quiz/:id/:category" element={<ChosenQuiz />}/>   
      <Route exact path="/login" element={<SignUp />}/>  
      <Route exact path="/user" element={<Profile />}/>  
     </Routes>  
    </div>
    </BrowserRouter>
    </Container>
  );
}

export default App;
