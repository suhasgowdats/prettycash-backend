const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    totalCredits:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model('logs', userSchema)