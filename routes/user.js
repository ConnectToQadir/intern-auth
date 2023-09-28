const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const validator = require('email-validator')



router.post("/register",async (req,res)=>{
    try {

        if(!req.body.password){
            res.status(400).json({
                success:false,
                message:"Password is Required!"
            })
            return
        }

        if(!req.body.email){
            res.status(400).json({
                success:false,
                message:"Email is Required!"
            })
            return
        }else if(!validator.validate(req.body.email)){
            res.status(400).json({
                success:false,
                message:"Not a valid Email!"
            })
            return
        }



        const hashedPassword =await bcrypt.hash(req.body.password,10)
        const user = await UserModel.create({...req.body,password:hashedPassword})

        res.status(201).json({
            success:true,
            message:user
        })


    } catch (error) {

        if(error.code === 11000){
            if(error.keyPattern.email){
                res.status(409).json({
                    success:false,
                    message:"Email Already in use!"
                })
            }else if(error.keyPattern.username){
                res.status(409).json({
                    success:false,
                    message:"Username Already in use!"
                })
            }

            return
        }

        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})


router.post("/login",async (req,res)=>{
    try {
        
        if(!(req.body.username && req.body.password)){
            res.status(400).json({
                success:false,
                message:"Username and Password are Required!"
            })
            return
        }

        const foundUser = await UserModel.findOne({username:req.body.username})
        if(!foundUser){
            res.status(404).json({
                success:false,
                message:"Invalid Username or Password!"
            })
            return
        }

        var isPasswordValid =await bcrypt.compare(req.body.password,foundUser.password)
        if(!isPasswordValid){
            res.status(404).json({
                success:false,
                message:"Invalid Username or Password!"
            })
            return
        }



        var token = jwt.sign({id:foundUser._id},process.env.SECRET_KEY,{expiresIn:"15s"})

        res.cookie('accessToken',token)


        res.json({
            success:true,
            message:"Login Successfully!"
        })



    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})





module.exports = router








