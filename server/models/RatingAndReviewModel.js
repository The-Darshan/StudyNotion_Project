const mongoose = require("mongoose")

const ratingAndReviewSchema = new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    rating:{
        type:Number,
        min:0,
        max:5,
    },
    review:{
        type:String,
    },
    Course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        index:true
    }
})

module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema)