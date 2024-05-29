const Profile = require("../models/ProfileModel");
const User = require("../models/UserModel");
const { uploadImageToCloudinary } = require("../utility/imageUploader");
const CourseProgress = require("../models/CourseProgressModel");
const Course = require("../models/CourseModel");
require("dotenv").config();
const { convertSecondToDuration } = require("../utility/secToDuration");

exports.updatePofile = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      dateOfBirth = "",
      about = "",
      contactNumber,
      gender,
    } = req.body;
    const id = req.user.id;
    if (!firstname || !lastname || !contactNumber || !gender || !id) {
      return res.json({
        success: false,
        Message: "Missing Details",
      });
    }

    const user = await User.findById(id);
    const profile = user.additionalinfo;
    const profileDetails = await Profile.findById(profile);

    user.firstname = firstname;
    user.lastname = lastname;
    await user.save();
    console.log("E");

    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    profileDetails.gender = gender;
    console.log("C");
    await profileDetails.save();

    const newUser = await User.findById(id).populate("additionalinfo").exec();
    console.log("D");
    return res.status(200).json({
      success: true,
      Message: "Profile Updated",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      Message: "Error in Updating Profile , try again later .",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userid = req.user.id;
    const userDetails = await User.findById(userid);
    if (!userDetails) {
      return res.json({
        success: false,
        Message: "No Possible",
      });
    }
    await Profile.findByIdAndDelete({ _id: userDetails.additionalinfo });
    await User.findByIdAndDelete(userid);
    await CourseProgress.deleteMany({ userId: userid });
    return res.status(200).json({
      success: true,
      Message: "Account Deleted",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      Message: "Error in Deleting Account , try again later .",
    });
  }
};

exports.getAllUsersDetails = async (req, res) => {
  try {
    const userid = req.user.id;

    const userDetails = await User.findById(userid)
      .populate("additionalinfo")
      .exec();
    console.log("A");
    if (!userDetails) {
      return res.json({
        success: false,
        Message: "No Possible",
      });
    }

    return res.status(200).json({
      success: true,
      Message: "All Details successfully fetched .",
      userDetails: userDetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      Message: "Error in Getting all Details , try again later .",
    });
  }
};

exports.updateProfilePicture = async (req, res) => {
  console.log("C")
  try {
    const userID = req.user.id;
    const image = req.files.Image_url;
    console.log(image,userID)

    if (!image) {
      return res.status(404).json({
        status: false,
        message: "No image find",
      });
    }
    console.log("A")
    const updatedimage = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(updatedimage)
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { image: updatedimage.secure_url },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "Proile photo updated successfully.",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: err.message,
      message: "Failing in updating profile picture. Please try agian.",
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const CourseDetails = await Course.find({ createdBy: req.user.id });

    const courseData = CourseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // create a new object with the additional fields .

      const courseDataWithStats = {
        _id: course._id,
        title: course.title,
        description: course.description,
        totalAmountGenerated,
        totalStudentsEnrolled,
      };
      return courseDataWithStats;
    });

    return res.status(200).json({
      courses: courseData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server Error.",
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userID = req.user.id;
    let userDetails = await User.findById(userID)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();
    userDetails = userDetails.toObject();
    for (let i = 0; i < userDetails.courses?.length; i++) {
      let SubSectionLength = 0;
      let totalDurationInSeconds = 0;
      for (let j = 0; j < userDetails.courses[i].courseContent?.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.time), 0);
        userDetails.courses[i].totalDuration = convertSecondToDuration(
          totalDurationInSeconds
        );

        SubSectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
        }
        console.log("SSL",SubSectionLength)
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userID,
      });
      courseProgressCount = courseProgressCount?.completedVedio?.length;
      if (SubSectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
        Math.round(
          (courseProgressCount / SubSectionLength) * 100 * multiplier
        ) / multiplier
      }
    }
    return res.status(200).json({
        success:true,
        data:userDetails.courses
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch Enrolled Courses Data",
    });
  }
};
