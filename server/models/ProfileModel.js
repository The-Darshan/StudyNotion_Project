const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    dateOfBirth:{
        type:String,
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"],
    },
    contactNumber:{
        type : Number,
        max:"9999999999"
    },
    about:{
        type:String,
        trim:true,
    },
})

module.exports = mongoose.model("Profile",profileSchema)