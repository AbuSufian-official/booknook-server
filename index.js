import 'dotenv/config'
import express from "express"
import cors from "cors"
import { MongoClient } from 'mongodb';



const app=express();
const port=8000;
const client = new MongoClient(process.env.MONGODB_URI_SERVER);
app.use(cors())
app.use(express.json())

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
app.post("/books",async(req,res)=>{
    res.send({success:true,massage:"successfully send data"})
    const insertDataDB = await DBcollection.insertOne(req.body)
    
})
app.get("/books",async(req,res)=>{
    const findData=await DBcollection.find({}).toArray()
    res.send(findData)
})

app.listen(port,()=>{
    console.log(`server is running ${port}`)
})