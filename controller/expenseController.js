const Expense=require('../modules/userExpense')
const asyncHandler=require('express-async-handler')


const addExpenses=asyncHandler(async(req,res)=>{
    console.log(req.body)
    const {custerId,date,catogary,discription,amount}=req.body
    if(!custerId || !date || !catogary || !discription || !amount){
        throw new Error('Please fill all fields')
    }

    try{
        const expense=await Expense.create({
            date:req.body.date,
            catogary:req.body.catogary,
            discription:req.body.discription,
            amount:req.body.amount,
            custerId:req.body.custerId
        })
        res.send(expense)
    }catch(error){
        throw new Error('error occured')
    }
})

const expenseList=asyncHandler(async(req,res)=>{
    const expense=await Expense.find()
    res.send(expense)
})

const deleteExpense=asyncHandler(async(req,res)=>{
    const item=await Expense.deleteOne({_id:req.params.id})
    res.send("Removed from list")
})

module.exports={addExpenses,expenseList,deleteExpense}