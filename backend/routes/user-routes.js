const { Router } = require('express')
const express=require('express')
const { signup, login, getUser, refreshToken, verifyToken, logout } = require('../controllers/user-controllers')
const router=express.Router()

// router.get("/",(req,res,next)=>{
//     res.send("Helloww  Test")
// })
router.post("/signup",signup)
router.post("/login",login)
router.get("/user",verifyToken, getUser)
//(refresh T)Verify token if user still there on wesite for expries token
router.get("/refresh",refreshToken,verifyToken,getUser)
router.post('/logout',verifyToken, logout)
module.exports=router