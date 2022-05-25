const express=require('express')
const dotenv=require('dotenv')
const colors=require('colors')
const cors=require('cors')
const userRouter=require('./routers/userRouter')
const expenseRouter=require('./routers/expenseRouter')
const transactionRouter=require('./routers/transactionRouter')
require('./config')
dotenv.config()

const app=express()
app.use(express.json())
app.use(cors())


app.get('/', (req, res)=>{
    res.send('This server is reserved for prettycash application')
})

app.use('/',userRouter)

app.use('/addexpense',expenseRouter)

app.use('/transaction',transactionRouter)





const PORT=process.env.PORT || 5500

app.listen(PORT, console.log("Application is running in port:",PORT.blue.bold))