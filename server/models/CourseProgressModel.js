const mongoose = require("mongoose")

const courseProgressSchema = new mongoose.Schema({
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    completedVedio:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
        // SubSection isliye liya h kyuki subSection se hi pta chalega ki total kitni videos h ek course m.   
        required:true,
    }]
})

module.exports = mongoose.model("CourseProgress",courseProgressSchema)