require('dotenv').config()
const port=process.env.port
const db=process.env.db
const mongoose=require('mongoose')
const app=require('./app')
// console.log(db)
mongoose.connect(db).then(()=>{
    //open server
    app.listen(port)
    console.log(`Server is running at ${port}`)
}).catch((err)=>{
    console.log(err)
})