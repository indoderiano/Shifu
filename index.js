const express=require('express')
const path=require('path')
const bodyParser=require('body-parser')
const cors=require('cors')
const bearertoken=require('express-bearer-token')


const app=express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
app.use(bearertoken())


// app.get('/',(req,res)=>{
//     return res.send('<h2>Api E-trainer</h2>')
// })

const {AuthRouters,TrainerRouters,ScheduleRouters} = require('./api/routers')

app.use('/users',AuthRouters)
app.use('/trainers',TrainerRouters)
app.use('/schedules',ScheduleRouters)



app.use(express.static(path.join(__dirname, '/web/build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/web/build', 'index.html'));
});


// const PORT=5000
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log('server online in port 5000'))