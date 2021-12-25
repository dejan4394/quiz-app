import pkg from "mongoose";
const Mongoose = pkg
 
const Schema = Mongoose.Schema

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    user: String,
    password: String,
    
    date:{
        type: Date,
        default: new Date()
    }
})

const User = Mongoose.model("user", userSchema)

export default User;