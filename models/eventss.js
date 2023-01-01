const mongoose=require('mongoose')
const event=new mongoose.Schema({
    event:{type:String},
    date:{type:String}
})
const env=mongoose.model('events',event)
module.exports=env