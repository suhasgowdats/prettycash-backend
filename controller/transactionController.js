const Transaction=require('../modules/userTransaction')
const asyncHandler=require('express-async-handler')
const req = require('express/lib/request')

const addTransaction=asyncHandler(async(req,res)=>{
    const {custId, date, bank, accountNumber, amount}=req.body
    if(!custId || !date || !bank || !accountNumber || !amount){
        throw new Error("Please fill all the fields")
    }
    try{
        const trans=await Transaction.create({
            custId:req.body.custId,
            date:req.body.date,
            bank:req.body.bank,
            accountNumber:req.body.accountNumber,
            amount:req.body.amount
        })
        res.send(trans)
    }catch(error){
        throw new Error('Error occured')
    }
})

const getTransaction=asyncHandler(async(req,res)=>{
    const trans=await Transaction.find()
    res.send(trans)
})


const deleteTrans=asyncHandler(async(req,res)=>{
    const ress= await Transaction.deleteOne({_id:req.params.id})
    res.send('Transaction removed from list')
})

module.exports={addTransaction,getTransaction,deleteTrans}