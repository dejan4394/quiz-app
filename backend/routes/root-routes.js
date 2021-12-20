import express from "express"
import User from "../models/user.js"
// import User from "../models/signup.js";
import { MongoClient } from 'mongodb';



const router = express.Router()

const url = "mongodb+srv://dejan4394:ilinamalinova2018@cluster0.5bfpt.mongodb.net/QuizAnswers?retryWrites=true&w=majority"

router.post("/", (req,res)=>{

    const user = req.body.user
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
            (err, result) => {
                if (err) throw err;
                if(result === null)
                {
                   console.log("user doesnt exists");
                   res.send("Invalid e-mail!!!")
            }
            else {
                console.log(result);
                const newSubmitedResults = {
                        quiz_name: req.body.quizz_name,
                        score: req.body.score 
                }
                dataBase.collection("users").updateOne({
                    user
                },{ $push: { completed_quizes: newSubmitedResults} })

                console.log("user already exists");
            
                res.status(200).send("Successfully submited answers!!!")
            }
            });
        });
   
})






router.get("/completed", (req,res)=>{
    const { user } = req.query
    console.log(user);
    console.log('Request sent to the Server');
    MongoClient.connect(url, async(err, db) => {
            if (err)
                throw err;
            let dataBase = db.db("QuizAnswers");
            dataBase.collection("users").findOne({
                user
            },
            (err, result) => {
                if (err) throw err;
                const ans = result
                console.log(ans);
                // console.log(ans.json());
                res.status(200).send(ans)
                db.close();
            });
        });
        
     
})


export default router