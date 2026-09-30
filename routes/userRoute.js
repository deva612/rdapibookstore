const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router();

router.post('/admin/login',(req,res)=>{
    userController.doAdminLogin(req,res)
})
router.get('/users',(req,res)=>{
    userController.getUsers(req,res)
})
module.exports = router