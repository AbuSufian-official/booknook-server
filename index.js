import 'dotenv/config'
import express from "express"

const app=express();
const port=8000;

app.get("/",(req,res)=>{
    res.send({massage:"booknook server is successfully running....."})
})

app.listen(port,()=>{
    console.log(`server is running ${port}`)
})