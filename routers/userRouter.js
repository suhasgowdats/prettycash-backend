const express=require('express')
const {loginController, registerController,getUserdetaail, updateCredits}=require('../controller/userController')

const router=express.Router()

router.route('/').post(loginController)
router.post('/register',registerController)
router.post('/getinfo',getUserdetaail)
router.put('/updatecredit/:id',updateCredits)



module.exports=router