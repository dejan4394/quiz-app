import {BrowserRouter, Route, Routes} from "react-router-dom"
import LogInPage from "./pages/LogInPage";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import "./App.css"
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import LinuxQuiz from "./pages/LinuxQuiz";
import BashQuiz from "./pages/BashQuiz";


function App() {
  return (
    <Container maxWidth="md">
    <BrowserRouter>
    <Navbar />
    <div>
    <Routes>
      <Route exact path="/welcome" element={<HomePage />}/>  
      <Route exact path="/linux" element={<LinuxQuiz />}/>  
      <Route exact path="/bash" element={<BashQuiz />}/>  
      <Route exact path="/login" element={<LogInPage />}/>  
      <Route exact path="/user" element={<Profile />}/>  
     </Routes>  
    </div>
    </BrowserRouter>
    </Container>
  );
}

export default App;
