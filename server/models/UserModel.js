const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type : String,
        required :true,
        trim : true,
    },
    password:{
        type : String,
        required : true,
    },
    accounttype:{
        type : String,
        required:true,
        enum : ["Student","Instructor","Admin"],
    },
    courses:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }],
    courseprogress:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : "CourseProgress",
    }],
    additionalinfo :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        },
    image:{
        type:String,
        required : true,
    },
    token:{
        type:String
    },
    resetPasswordExpire:{ 
        type:Date
    },
    // active:{
    //     type: Boolean,
    //     default: true,
    // },
    // approved:{
    //     type: Boolean,
    //     default: true,
    // },
}
,{timestamps:true}
)

module.exports = mongoose.model("User",userSchema)