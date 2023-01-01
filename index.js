const express=require('express')
const fs= require('fs')
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()
const mongoose=require('mongoose')
// const Mongocli=require('mongodb').MongoClient
mongoose.pluralize(null)
const bodyParser=require('body-parser')
const app= express()
// const process=require('process')
const events=require('./models/eventss')
// console.log(process)
const port=process.env.PORT || 4001
// Requiring module
// console.log(process.env)
var url =process.env.NODE_ENV_MONGO_URL;


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.set('strictQuery', false)
mongoose.connect(url).then(()=>{console.log('connection success')})
const lists=require('./models/user')
const { json } = require('body-parser')
// console.log(Object.keys(mongoose.connection.collections))
// console.log(collections)
// console.log(lists.find().pretty())
const fn=async()=>{
    const fin=await lists.find({})
    
    console.log(fin)
}
// fn()
const f=fs.readFileSync('../data.json','utf-8')
const d=JSON.parse(f)
// console.log(d.length)
const func=async ()=>{
    for(let i=0;i<d.length;i++){
        const userdata=await new lists({
        NAME:d[i].NAME,
        ITS:+d[i].ITS,
        GROUP:d[i].GROUP
        })
     await userdata.save()
}
}
// console.log(d[119])
// func()
let ev=''
app.post('/event',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    try{
        const date=new Date()
const month=["","January","February","March","April","May","June","July",
"August","September","October","November","December"];
const finaldate=`${date.getDate()} ${month[date.getMonth()]}, ${date.getFullYear()}`
    res.send('hi')
    const event=req.body.event
    // const event=Object.keys(req.body)
    const repeat=await events.find({event:event})
    console.log(repeat.length)
    if(repeat.length===0){
    const ff=await new events({
    event:event,
   date:finaldate
    })
   ff.save()}
    const newev=new mongoose.Schema({
        name:{type:String},
        its:{type:Number},
        group:{type:String},
        date1:{type:String}
    },{
        collation:{event}
    })
     ev=mongoose.model(`${event}`,newev)}
     catch(err){
        console.log(err)
     }
     
})
app.post('/info',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    try{
        const its=req.body.its
    if(+its){
    const user= await lists.findOne({ITS:+its})
    
    if(user){
    const date=new Date()
    const month=["","January","February","March","April","May","June","July",
          "August","September","October","November","December"];
    const finaldate=`${date.getDate()} ${month[date.getMonth()]}, ${date.getFullYear()}`
    // const repeat2=await ev.find({its:+its})
    // if(repeat2.length===0){
   const loguser=await new ev({
    name:user.NAME,
    its:user.ITS,
    group:user.GROUP,
    date1:finaldate
   })
   await loguser.save()
   res.send(user.NAME)


}
else{
    res.send()
}
}
else{
res.send()
}}
catch(err){
    console.log(err)
}
}
)

app.post('/forlist',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
 try{
    const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(url, { useUnifiedTopology: true }); // { useUnifiedTopology: true } removes connection warnings;

const dbName = "mongo";

client
      .connect()
      .then(
        client =>
          client
            .db(dbName)
            .listCollections()
            .toArray() // Returns a promise that will resolve to the list of the collections
      )
      .then((cols)=>{
         if(req.body.data){
       mongoose.connection.dropCollection(req.body.data) 
    }
    let collections=[]
    for(let u=0;u<cols.length;u++){
   collections.push(cols[u].name)
    }
   
      })
      const sendevent=await events.find({})
      res.send(sendevent)}
      catch(err){
        console.log(err)
      }
})
app.post('/names',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
   try
   { const MongoClient=require('mongodb').MongoClient
    const client2 = new MongoClient(url, { useUnifiedTopology: true })
    const collectionname=req.body.data
        const database=await client2.db('mongo')
        const collection=await database.collection(collectionname)
        const alluser=await collection.find({}).toArray((err,resp)=>{res.send(resp)})
}
catch(err){
    console.log(err)
}
   
})

// Connection url

app.listen(port,()=>{
    console.log('done')
})