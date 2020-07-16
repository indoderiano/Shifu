const express=require('express')
const {AuthControllers}=require('../controllers')
const {Auth}=require('../helper/Auth')

const router=express.Router()

router.get('/categories',AuthControllers.getCategories)
router.post('/register',AuthControllers.register)
router.put('/verification',AuthControllers.accountverify)
router.post('/verification',AuthControllers.emailverification)
router.get('/login/:username/:password',AuthControllers.login)
router.get('/keeplogin',Auth,AuthControllers.keeplogin)
router.put('/password/:id',AuthControllers.changepassword)

module.exports=router