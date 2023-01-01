const mongoose=require('mongoose')
const ur=new mongoose.Schema({
    NAME:{type:String},
    ITS:{type:Number},
    GROUP:{type:String}
})
const models=mongoose.model('lists',ur)
module.exports=models