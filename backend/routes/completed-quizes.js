import express from "express"
import Result from "../models/new-resilts.js"
import { MongoClient } from 'mongodb';



const router = express.Router()

const url = "mongodb+srv://dejan4394:ilinamalinova2018@cluster0.5bfpt.mongodb.net/QuizAnswers?retryWrites=true&w=majority"

router.post("/", (req,res)=>{

    const user = req.fields.user
    console.log(user);
    console.log('Request sent to the Server');
    MongoClient.connect(url, async(err, db) => {
            if (err)
                throw err;
            console.log("CONNECTED");
            let dataBase = db.db("QuizAnswers");
            dataBase.collection("results").findOne({
                user
            },
            (err, result) => {
                if (err) throw err;
                if(result === null)
                {const newSubmitedResults = new Result({
                    user: req.fields.user,
                    password: req.fields.password,
                    completed_quizes: {
                        quiz_name: req.fields.quiz_name,
                        answers: req.fields.answers,
                        offeredAnswers: req.fields.offeredAnswers,
                        questions: req.fields.questions}
                    
                })
                newSubmitedResults.save()
                    res.send("Successfully submited answers!!!")
                
                db.close()
            }
            else {
                console.log(result);
                const newSubmitedResults = {
                    
                        quiz_name: req.fields.quiz_name,
                        answers: req.fields.answers,
                        offeredAnswers: req.fields.offeredAnswers,
                        questions: req.fields.questions
                    
                }
                dataBase.collection("results").updateOne({
                    user
                },{ $push: { completed_quizes: newSubmitedResults} })

                console.log("user already exists");
            
            }
            });
        });
    
    // const newSubmitedResults = new Result({
    //     user: req.fields.user,
    //     completed_quizes: {
    //         quiz_name: req.fields.quiz_name,
    //         answers: req.fields.answers,
    //         offeredAnswers: req.fields.offeredAnswers,
    //         questions: req.fields.questions}
        
    // })
    // newSubmitedResults.save()
    //     res.send("Successfully submited answers!!!")
   
})






router.get("/completed", (req,res)=>{
    const { user } = req.query
    console.log(user);
    console.log('Request sent to the Server');
    MongoClient.connect(url, async(err, db) => {
            if (err)
                throw err;
            let dataBase = db.db("QuizAnswers");
            dataBase.collection("results").findOne({
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