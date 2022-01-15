import express from "express"
import { MongoClient } from 'mongodb';
import jwt_decode from "jwt-decode"
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router()


//===DELETE QUIZZ======================================================

router.post("/delete", (req,res)=>{
    console.log(__dirname);
    let token  = req.headers.authorization
    console.log(token);
    var decoded = jwt_decode(token);

    const decodedToken = decoded.user
    console.log(decodedToken);
    console.log(req.body.id);
    console.log('Delete Request sent to the Server!!!');
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
                    const id = {
                            id: req.body.id
                    }
                    const quizToDeleteId = `completed_quizes.${id.id}`
                    console.log(quizToDeleteId);
           
                    dataBase.collection("users").updateOne({user: decodedToken}, {$unset : { [quizToDeleteId] : 1 }}) 
                    dataBase.collection("users").updateOne({user: decodedToken}, {$pull : {"completed_quizes" : null}})

                console.log("Successfully deleted quizz!!!");
                    res.status(200).json({
                    success: true,
                    message: "Successfully deleted quizz!!!"})
               
            }
            });
        });
   
})
//=======================================================================

export default router