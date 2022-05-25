const  mongoose=require('mongoose');

const transactionSchema=new mongoose.Schema({
    custId:String,
    date:String,
    bank:String,
    accountNumber:String,
    amount:Number
})

module.exports=mongoose.model('transactions', transactionSchema)