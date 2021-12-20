import express from "express"
import User from "../models/user.js"
import { MongoClient } from 'mongodb';
import passport from "../passport/index.js"
import bcrypt from "bcrypt"





const router = express.Router()

const url = "mongodb+srv://dejan4394:ilinamalinova2018@cluster0.5bfpt.mongodb.net/QuizAnswers?retryWrites=true&w=majority"

router.post("/signup", (req,res)=>{

    const user = req.body.username
    console.log(user);
    console.log('Request sent to the Server');
    MongoClient.connect(url, async(err, db) => {
            if (err)
                throw err;
            console.log("CONNECTED");
            let dataBase = db.db("QuizAnswers");
            dataBase.collection("users").findOne({
                user
            },
            async (err, result) => {
                if (err) throw err;
                if(result === null)
                    {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);

                        const newUserData = new User({
                        user: user,
                        password: hashedPassword,
                    })
                    console.log(newUserData);
                    newUserData.save()
                        res.send("Successfully Signed!!!")
                    
                    db.close()
                }
                else {
                    console.log("user already exists");
                    res.status(200).send("Email Already registered!!!")      
            }
            });
        });
    
    
})

// router.get("/sranje", (req,res)=>{
//     if(req.isAuthenticated){
//         console.log("lajno");
//         // res.send("sranje")
//     }else{
//         console.log("gomno");
//     }
// })

router.post("/login", (req, res, next) => {
    console.log("received user info");
    
    passport.authenticate("local", (err, user, info) => {
        
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
        //   res.send("Successfully Authenticated");
            console.log(req.user);
            const token = req.user.user;
            res.send(token)

        });
      }
    })(req, res, next);
  });


  

export default router