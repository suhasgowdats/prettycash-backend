const express=require('express')
const {addExpenses, expenseList, deleteExpense}=require('../controller/expenseController')

const router=express.Router()

router.post('/',addExpenses)
router.get('/list',expenseList)
router.delete('/:id',deleteExpense)

module.exports=router