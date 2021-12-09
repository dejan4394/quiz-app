import express from "express"
import Result from "../models/new-resilts.js"


const router = express.Router()

router.post("/", (req,res)=>{

   
   console.log(req.fields.answers);
   console.log(req.fields.questions);
    const newSubmitedResults = new Result({
        user: req.fields.user,
        answers: req.fields.answers,
        offeredAnswers: req.fields.offeredAnswers,
        questions: req.fields.questions
        
    })
    newSubmitedResults.save()
    const newLocal = "successfully submited answers!!!";
    res.send(newLocal)
})


export default router