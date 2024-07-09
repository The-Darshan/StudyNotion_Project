const mongoose = require("mongoose")

const chatRoom = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique : true,
    },
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    Admin : 
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        } , 
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = new mongoose.model("ChatRoom",chatRoom);