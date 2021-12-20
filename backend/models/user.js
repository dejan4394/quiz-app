import pkg from "mongoose";
const Mongoose = pkg
 
const Schema = Mongoose.Schema

const userSchema = new Schema({
    user: String,
    password: String,
    
    date:{
        type: Date,
        default: new Date()
    }
})

const User = Mongoose.model("user", userSchema)

export default User;