const express=require('express')
const { signup, login, verfiyToken, getUser, refreshToken } = require('../controllers/user-controllers')
const router=express.Router()

router.get("/",(req,res,next)=>{
    res.send("Helloww  Test")
})
router.post("/signup",signup)
router.post("/login",login)
router.get("/user",verfiyToken, getUser)
//(refresh T)Verify token if user still there on wesite for expries token
router.get("/refresh",refreshToken,verfiyToken,getUser)
module.exports=router