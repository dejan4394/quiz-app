import pkg from "mongoose";
const Mongoose = pkg
 
const Schema = Mongoose.Schema

const ResultsSchema = new Schema({
    user: String,
    questions: {
        type: Array
    },
    offeredAnswers: {
        type: Array
    },
    answers: {
        type: Array
    }
})

const Result = Mongoose.model("result", ResultsSchema)

export default Result;