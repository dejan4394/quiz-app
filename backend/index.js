import express from "express";
import mongoose from "mongoose";
import Results from "./routes/quizes-routes.js"
import Users from "./routes/users-route.js"
import DeleteQuiz from "./routes/delete-quiz-route.js"
import Cors from "cors";
import session from "express-session";
import passport from "./passport/index.js"
import cookieParser from "cookie-parser";
import path from "node:path"

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

    

//CONNECTION TO THE DATA BASE====

const url = process.env.MONGODB_URI
mongoose.connect(url, {useNewUrlParser: true})
.then(()=>console.log("Connected to the Data Base"))
.catch( err=> console.log(err))

app.use(Cors())



//==INITIALIZE PASSPORT========

app.use(passport.initialize());
// app.use(passport.session());


//==ROOT ROUTES================

app.use("/quizes", Results)
app.use("/users", Users)
app.use("/quizes", DeleteQuiz)


// If in production...================
if( process.env.NODE_ENV=== 'production' ) {
  //Set static folder
  app.use(express.static('build'))

  app.get( '*', ( req, res ) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  } )
}

const port = process.env.PORT || 5000;

app.listen( port, ()=> console.log(`Server running on ${port}`))