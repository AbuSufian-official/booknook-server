import 'dotenv/config'
import express from "express"
import { MongoClient } from 'mongodb';



const app=express();
const port=8000;
const client = new MongoClient(process.env.MONGODB_URI_SERVER);


export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const connectClient=await connectToMongoDB()
const DB=connectClient.db("booknook")
const DBcollection=DB.collection("booknookAllbook")

app.get("/",(req,res)=>{
    res.send({massage:"booknook server is successfully running....."})
})
app.post("/books",(req,res)=>{
    
})


app.listen(port,()=>{
    console.log(`server is running ${port}`)
})