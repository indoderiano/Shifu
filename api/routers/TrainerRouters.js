const express=require('express')
const {TrainerControllers}=require('../controllers')

const router=express.Router()

router.get('/find',TrainerControllers.trainersbycategory)
router.get('/get/:id',TrainerControllers.gettrainer)

module.exports=router