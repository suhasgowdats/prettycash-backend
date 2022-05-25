const Users=require('../modules/usersInfo')
const asyncHandler=require('express-async-handler')
const {hashingPws, verifyPws}=require('../auth/pwsHash')
const JWT=require('jsonwebtoken')
const dotenv=require('dotenv')
const { required } = require('nodemon/lib/config')
dotenv.config()


const registerController=asyncHandler(async(req, res)=>{
    const { name, email, password}= req.body
    if (!name || !email || !password){
        throw new Error("Please enter all the fields".red.bold)
    }
    const userExist=await Users.findOne({email})
    if(userExist){
        throw new Error ("User already exist".red.bold)
    }else{
        const hashedPws=await hashingPws(req.body.password)
        console.log(hashedPws)
        req.body.password=hashedPws
        const user=await Users.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        JWT.sign({user},process.env.jwtKey,{expiresIn:'3hr'},(err,token)=>{
            if(err){
                throw new Error("somethin went wrong")
            }else{
                res.send({user,token})
            }
        })
    }
})


const loginController=asyncHandler(async(req,res)=>{
    const {email, password}=req.body
    if(!email || !password){
        throw new Error('Please enter all fields')
    }
    const user= await Users.findOne({email})
    if(user){
        const checkPws=await verifyPws(req.body.password, user.password)
        if(checkPws){
            JWT.sign({user},process.env.jwtKey,{expiresIn:'3hr'},(err,token)=>{
                if(err){
                    throw new Error("somethin went wrong")
                }else{
                    res.send({user,token})
                }
            })
        }
        else{
            throw new Error('Password incorrect')
        }
    }
    else{
        throw new Error("User does not exist, pls signin")
    }
})

const getUserdetaail=asyncHandler(async(req, res)=>{
    const {email}=req.body
    const userInfo=await Users.findOne({email})
    if(userInfo){
        res.send(userInfo)
    }else{
        res.send("error occured")
    }
})

const updateCredits=asyncHandler(async(req,res)=>{
    console.log(req.params.id)
    console.log(req.body.totalCredits)
    const rss=await Users.updateOne(
        {_id:req.params.id},
        {$set:{totalCredits:req.body.totalCredits}}
    )
    res.send('Update successfull')
})

module.exports={loginController, registerController,getUserdetaail,updateCredits}