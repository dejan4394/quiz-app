import pkg from "mongoose";
const Mongoose = pkg
 
const Schema = Mongoose.Schema

const ResultsSchema = new Schema({
    user: String,
    password: String,
    completed_quizes: {
        type:Array,
        default:{quiz_name: String,
        questions: '',
        offeredAnswers: {
            type: Array
        },
        answers: {
            type: Array
        }}},
    date:{
        type: Date,
        default: new Date()
    }
})

const Result = Mongoose.model("result", ResultsSchema)

export default Result;