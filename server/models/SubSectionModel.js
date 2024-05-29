const mongoose = require("mongoose")

const subSectionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
        required:true,
    },
    vedioURL:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("SubSection",subSectionSchema)