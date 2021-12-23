import express from "express"
import User from "../models/user.js"
// import User from "../models/signup.js";
import { MongoClient } from 'mongodb';
import jsonwebtoken  from 'jsonwebtoken'



const router = express.Router()

const url = "mongodb+srv://dejan4394:ilinamalinova2018@cluster0.5bfpt.mongodb.net/QuizAnswers?retryWrites=true&w=majority"

router.post("/", (req,res)=>{

    let token  = req.headers.authorization
    console.log(token);
    jsonwebtoken.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            return res.status(500).send({
                message: err.message
            })
        }
       
        token = decoded.user
        // req.userId = decoded.id
        // console.log(id);
})
    console.log(token);

    console.log('Request sent to the Server');
    MongoClient.connect(url, async(err, db) => {
            if (err)
                throw err;
            console.log("CONNECTED");
            let dataBase = db.db("QuizAnswers");
            dataBase.collection("users").findOne({
                user: token
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
                    user: token
                },{ $push: { completed_quizes: newSubmitedResults} })

                console.log("Successfully submited answers");
                    res.status(200).json({
                    success: true,
                    message: "Successfully submited answers!!!"})
               
            }
            });
        });
   
})






router.get("/completed", (req,res)=>{
    let token  = req.headers.authorization
    console.log(token);
    jsonwebtoken.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            return res.status(500).send({
                message: err.message
            })
        }
       
        token = decoded.user
        // req.userId = decoded.id
        // console.log(id);
})
    console.log(token);
    console.log('Request sent to the Server');
    MongoClient.connect(url, async(err, db) => {
            if (err)
                throw err;
            let dataBase = db.db("QuizAnswers");
            dataBase.collection("users").findOne({
               user:token
            },
            (err, result) => {
                if (err) throw err;
                if(result.completed_quizes){
                    console.log("Successfull Fetched Data from DB!!!!!!!!!!!!!!!!!!!!!!");
            
                    res.status(200).json({
                        success: true,
                        result,
                        message: "Your completed quizes!!!"})
                    db.close();
                }else{
                    console.log("User doesnt have completed quizes!!!!!!");
                    res.status(200).json({
                        success: false,
                        message: "You dont have any completed quizes!!!"})
                }
               
            });
        });
        
     
})


export default router