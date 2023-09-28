const mongoose = require('mongoose')
const express = require('express')
const app = express()
const UserRoutes = require('./routes/user')
require('dotenv').config()

app.use(express.json())
app.use(express.static('public'))
app.use('/api/user',UserRoutes)



mongoose.connect("mongodb://127.0.0.1:27017/auth").then(()=>{
    console.log("Connected!")
}).catch(()=>{
    console.log("Not Connected!")
})



app.listen(3000,()=>{
    console.log("Server is Running...")
})