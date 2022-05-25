const  mongoose=require('mongoose');

const expenseSchema= new mongoose.Schema({
    custerId:String,
    date:String,
    catogary:String,
    discription:String,
    amount:Number
})


module.exports=mongoose.model('expenses',expenseSchema)