const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    forgetPassOTP:{
        otp:Number,
        expire:Date
    }
},{timestamps:true})

module.exports = mongoose.model('users',userSchema)