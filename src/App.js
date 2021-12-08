import {BrowserRouter, Route, Routes} from "react-router-dom"
import LogInPage from "./pages/LogInPage";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import "./App.css"
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import ChosenQuiz from "./pages/ChosenQuiz";


function App() {
  return (
    <Container maxWidth="md">
    <BrowserRouter>
    <Navbar />
    <div>
    <Routes>
      <Route exact path="/welcome" element={<HomePage />}/>  
      <Route exact path="/chosen-quiz/:id/:category" element={<ChosenQuiz />}/>   
      <Route exact path="/login" element={<LogInPage />}/>  
      <Route exact path="/user" element={<Profile />}/>  
     </Routes>  
    </div>
    </BrowserRouter>
    </Container>
  );
}

export default App;
