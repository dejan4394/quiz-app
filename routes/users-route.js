import express from "express"
import User from "../models/user.js"
import { MongoClient } from 'mongodb';
import passport from "../passport/index.js"
import bcrypt from "bcrypt"
import jsonwebtoken  from 'jsonwebtoken'
import config from "../config/index.js"

const EXPIRES_IN_MINUTES = '1440m' // expires in 24 hours

const router = express.Router()


//==SIGN-UP ROUTE==========================================================

router.post("/signup", (req,res)=>{

    const user = req.body.username
    console.log(user);
    console.log('Request sent to the Server');

    MongoClient.connect(process.env.MONGODB_URI, async(err, db) => {
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
                   
                    const payload = { user: user }
                    console.log(payload);
        
                    // const token = jsonwebtoken.sign(payload, config.JWTSecret)

                    const newUserData = new User({
                                                    firstName: req.body.firstName,
                                                    lastName: req.body.lastName,
                                                    user: user,
                                                    password: hashedPassword,
                                                })
                    newUserData.save()
                    console.log("Sign Up Successfull!!!!!!");
                    
                    
                        return res.status(200).json({
                            success: true,
                            user,
                            // token,
                            message: 'Sign Up Successfull!!!'})
                    
                }
                else {
                    console.log("user already exists!!!!!!!!!!!!!!!!!");
                    return res.status(200).json({
                        success: false,
                        message: "User already exist!!!!!!!!!!!!!!!!!"})    
            }
            });
        });
})
//==============================================================================



//====LOGIN ROUTE===============================================================

router.post("/login", (req, res, next) => {
    
    console.log("Received  User Credentials");
    
    passport.authenticate("local-signin", (err, user, info) => {
        
      if (err) throw err;
      if (!user){
            return res.status(200).json({
                    success: false,
                    message: 'Incorect email or password!!!',
                    })
                };
        req.logIn(user, (err) => {
          if (err) throw err;

                const payload = { user: user.user }

                console.log(payload);
                console.log("passed strategy");

                const token = jsonwebtoken.sign(payload, config.JWTSecret, {
                    expiresIn: EXPIRES_IN_MINUTES,
                })

                user.password = undefined
                console.log("User authenticated!!!!!!");
                
                return res.status(200).json({
                    success: true,
                    user,
                    token,
                    message: "User authenticated!!!!!!"
                })
      
        });
      
    })(req, res, next);
  });
//=================================================================================

  

export default router