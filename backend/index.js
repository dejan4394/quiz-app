import express from "express";
import mongoose from "mongoose";
import Results from "./routes/root-routes.js"
import Users from "./routes/users-route.js"
import Cors from "cors";
import session from "express-session";
import passport from "./passport/index.js"
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cookieParser())
app.use(express.static("public"));
app.use(
      session({
        secret: "secretcode",
        resave: false,
        saveUninitialized: false,
      })
    );

//Connection to the Data Base
const url = "mongodb+srv://dejan4394:ilinamalinova2018@cluster0.5bfpt.mongodb.net/QuizAnswers?retryWrites=true&w=majority"
mongoose.connect(url, {useNewUrlParser: true})
.then(()=>console.log("Connected to the Data Base"))
.catch( err=> console.log(err))

app.use(Cors())




app.use(passport.initialize());
// app.use(passport.session());


//Root Routes
app.use("/results", Results)
app.use("/users", Users)

// app.use(function(req,res,next){
//   res.locals.currentUser = req.user;
//   next();
// })


const port = process.env.PORT || 5000;

app.listen( port, ()=> console.log(`Server running on ${port}`))