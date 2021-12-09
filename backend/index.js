import express from "express";
import mongoose from "mongoose";
import Resultati from "./routes/completed-quizes.js"
import ExpressFormidable from "express-formidable";



const app = express()

//Connection to the Data Base
const url = "mongodb+srv://dejan4394:ilinamalinova2018@cluster0.5bfpt.mongodb.net/QuizAnswers?retryWrites=true&w=majority"
mongoose.connect(url, {useNewUrlParser: true})
.then(()=>console.log("Connected to the Data BAse"))
.catch( err=> console.log(err))


//Body Parser
app.use(ExpressFormidable())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Root Routes
app.use("/results", Resultati)
// app.use("/user/info", userInfo)




const port = process.env.PORT || 5000;

app.listen( port, ()=> console.log(`Server running on ${port}`))