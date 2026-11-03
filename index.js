import 'dotenv/config'
import express from "express"
import cors from "cors"
import { MongoClient, ObjectId } from 'mongodb';



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
app.get("/books/:id",async(req,res)=>{
  const query={_id: new ObjectId(req.params.id)}
  const findOneData=await DBcollection.findOne(query)
  res.send(findOneData)
})

app.patch("/books/:id",async(req,res)=>{
    const idd={_id:new ObjectId(req.params.id)}
    const body=req.body
    const option={upsert:true}
    const updateDoc = {
      $set: {
        title:body.title,
        copies:body?.copies,
        description:body.description
      }
    }
    const result = await DBcollection.updateOne(idd, updateDoc, option);
    res.send(result)
})
app.delete("/books/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const deleteData = await DBcollection.deleteOne(query);
    res.send({success:true})
})

































app.listen(port,()=>{
    console.log(`server is running ${port}`)
})