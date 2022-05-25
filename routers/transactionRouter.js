const express=require('express')
const{addTransaction,getTransaction,deleteTrans}=require('../controller/transactionController')

const router=express.Router()

router.get('/',getTransaction)
router.post('/addtrans',addTransaction)
router.delete('/:id',deleteTrans)

module.exports=router