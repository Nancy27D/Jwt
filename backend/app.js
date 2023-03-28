const express= require('express')
const router=require("./routes/user-routes")
const cors=require('cors')
const cookieParser=require('cookie-parser')

const app=express()
//client send data to server in json format
app.use(express.json())
//allows access us to send data to diff server
app.use(cors({credentials:true, origin :"http://localhost:3000"} ))
app.use(cookieParser())

// app.use("/,",(req,res,next)=>{
//     console.log("open routess")
// })
app.use("/",router)

module.exports=app;