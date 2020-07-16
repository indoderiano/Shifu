const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const bearertoken=require('express-bearer-token')

// const mysql=require('mysql')
// const db=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'maungapain',
//     database:'etrainerdb',
//     port:'3306'
// })
// db.connect((err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log('connected to mysql etrainerdb')
// })


const app=express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
app.use(bearertoken())


app.get('/',(req,res)=>{
    return res.send('<h2>Api E-trainer</h2>')
})

const {AuthRouters,TrainerRouters,ScheduleRouters} = require('./routers')

app.use('/users',AuthRouters)
app.use('/trainers',TrainerRouters)
app.use('/schedules',ScheduleRouters)




// const PORT=5000
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log('server online in port 5000'))