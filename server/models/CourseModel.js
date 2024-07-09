const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    unique :true
  },
  description: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
  },
  language: {
    type: String,
  },
  whatULearn: // eg DSA , WEBD , JS
    {
      type: String,
    },
  courseContent: [ // eg API , Routing topics in js 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingAndReview: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  thumbnail: {
    type: String,
  },
  tag: {
    type : [String],
    required : true
  },
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  category :{
    type : mongoose.Schema.Types.ObjectId,
    ref:"Category"
  },
  Instruction:{
    type:[String]
  },
  status:{
    type:String,
    enum : ["Draft","Published"]
  },
});

module.exports = mongoose.model("Course", courseSchema);
