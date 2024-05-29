const Rating = require("../models/RatingAndReviewModel");
const Course = require("../models/CourseModel");
const { default: mongoose } = require("mongoose");

exports.createRating = async (req, res) => {
  try {
    // get userID and fetch data from req
    const { courseID, rating, review } = req.body;
    const userId = req.user.id;

    //check if user is enrolled or not
    const courseDetails = await Course.findOne({
      _id: courseID,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "Student not enrolled in course",
      });
    }

    // Check if user has already given ratings or not
    const alreadyReviewed = await Rating.findOne({
      username: userId,
      Course: courseID,
    });

    if (alreadyReviewed) {
      return res.status(409).json({
        success: false,
        message: "User has already rated this course.",
      });
    }

    // Create rating and review
    const ratingReview = await Rating.create({
      username: userId,
      rating,
      review,
      Course: courseID,
    });
    // update course with this rating/review
    const course = await Course.findByIdAndUpdate(
      courseID,
      {
        $push: { ratingAndReview: ratingReview._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: course,
      message: "Rating and Review added successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// Average Rating

exports.getAverageRating = async (req, res) => {
  try {
    // Get courseID
    const { courseID } = req.body;

    // calculate avg rating
    const result = await Rating.aggregate([
      {
        $match: {
          Course: new mongoose.Types.ObjectId(courseID),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "rating" },
        },
      },
    ]);

    // return rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    // if no rating/Review exist

    return res.status(200).json({
      success: true,
      message: "Average Rating is 0 , no ratings given till now",
      averageRating: 0,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get AllRatings
exports.getAllRatingsAndReviews = async (req, res) => {
  try {
    const allReviews = await Rating.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "username",
        select: "firstname lastname email image", // This  is to select the fields only we want to show from the user schema in the result .
      })
      .populate({
        path: "Course",
        select: "title",
      })
      .exec();

      return res.status(200).json({
        success:true,
        message:"All reviews fetched successfully.",
        data : allReviews
      })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
