import express from "express"
import User from "../models/user.js"
// import User from "../models/signup.js";
import { MongoClient } from 'mongodb';
// import jsonwebtoken  from 'jsonwebtoken'
import jwt_decode from "jwt-decode"
import { decode } from "jsonwebtoken";


const router = express.Router()

//===SAVE NEW QUIZZ======================================================

router.post("/", (req,res)=>{

    let token  = req.headers.authorization
    console.log(token);
    var decoded = jwt_decode(token);

    const decodedToken = decoded.user
    console.log(decodedToken);
    console.log(req.body);
    console.log('Request sent to the Server');
    MongoClient.connect(process.env.MONGODB_URI, async(err, db) => {
            if (err)
                throw err;
            console.log("CONNECTED");
            let dataBase = db.db("QuizAnswers");
            dataBase.collection("users").findOne({
                user: decodedToken
            },
            (err, result) => {
                if (err) throw err;
                if(result === null){
                    return res.status(500).json({
                       
                        message: 'User doesnt found!!!!!!!!!!'})
                   
                    }
                else {
                    console.log(result);
                    const newSubmitedResults = {
                            quiz_name: req.body.quizz_name,
                            difficulty: req.body.difficulty,
                            score: req.body.score 
                    }
                dataBase.collection("users").updateOne({
                    user: decodedToken
                },{ $push: { completed_quizes: newSubmitedResults} })

                console.log("Successfully submited answers");
                    res.status(200).json({
                    success: true,
                    message: "Successfully submited answers!!!"})
               
            }
            });
        });
   
})
//=======================================================================



//===GET COMPLETED QUIZES AT THE PROFILE PAGE============================

router.get("/completed", (req,res)=>{

    let token  = req.headers.authorization
    console.log(token);

    //--Decode the JWT---------------------------
    var decoded = jwt_decode(token);
    const decodedToken = decoded.user
    console.log(decodedToken);
    //-------------------------------------------

    console.log('GET COMPLETED QUIZES Request sent to the Server');
    MongoClient.connect(process.env.MONGODB_URI, async(err, db) => {
            if (err)
                throw err;
            let dataBase = db.db("QuizAnswers");
            dataBase.collection("users").findOne({
               user:decodedToken
            },
            (err, result) => {
                if (err) throw err;
                if(result){
                    console.log("Successfull Fetched Data from DB!!!!!!!!!!!!!!!!!!!!!!");
            
                    res.status(200).json({
                        success: true,
                        result,
                        message: result.completed_quizes ? "Your completed quizes!!!" : "You don't have any completed quizes!!!" })
                    db.close();
                }else{
                    res.status(200).json({
                        success: false,
                        message: "You dont have any completed quizes!!!"})
                }
               
            });
        });
        
     
})
//====================================================================

export default router