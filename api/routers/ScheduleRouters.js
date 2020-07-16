const express=require('express')
const {ScheduleControllers}=require('../controllers')

const router=express.Router()

router.post('/create',ScheduleControllers.create)
router.get('/card',ScheduleControllers.carddetails)
router.put('/status/:id',ScheduleControllers.updatestatus)

module.exports=router