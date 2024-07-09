const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    chatRoom :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "ChatRoom",
        required:true,
    },
    Sender:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required :true
    },
    Text_message:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = new mongoose.model("Messages",messageSchema)