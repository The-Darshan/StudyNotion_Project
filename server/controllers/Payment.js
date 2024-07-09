const mongoose = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/CourseModel");
const CourseProgress = require("../models/CourseProgressModel");
const user = require("../models/UserModel");
const mailSender = require("../utility/nodemailer");
const crypto = require("crypto");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollementEmail");
const ChatRoom = require("../models/ChatRoomModel")
// intialize the razorpay order

const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Data for courses or userID",
    });
  }

  for (const courseId of courses) {
    try {
      let enrolledCourse = await Course.findOneAndUpdate(
        {_id : courseId},
        {
          $push: { studentsEnrolled: userId },
        },
        { new: true }
      );

      console.log(enrolledCourse)

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "The provided course does not exist",
        });
      }

      const courseProgress = await CourseProgress.create({
        courseID:courseId,
        userId : userId,
        completedVedio:[],
      })
      
      let RoomName = enrolledCourse.title + "-Doubt-Room"
      console.log(RoomName)

      const result =   await ChatRoom.findOneAndUpdate({
        name:RoomName
      } ,
    {
      $push :{members:userId }
    },{
      new:true
    })


      const enrolledStudent = await user.findByIdAndUpdate(
        userId,
        { $push: { 
          courses: courseId,
          courseprogress: courseProgress._id , 
        }},
        { new: true }
      );


      const emailresponse = await mailSender(
        enrolledStudent.email,
        `Successfully enrolled into ${enrolledCourse.title}`,
        courseEnrollmentEmail(
          `${enrolledCourse.title}`,
          `${enrolledStudent.firstname} ${enrolledStudent.lastname}`
        )
      );
      console.log("Email Sent Successfully", emailresponse.response);

    }
     catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }
};

exports.capturePayment = async (req, res) => {
 
  const { courses } = req.body;
  const userId = req.user.id;

  if (courses.length === 0) {
    return res.json({ success: false, message: "Please provide Course Id" });
  }

  let totalAmount = 0;

  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res.status(400).json({
          success: false,
          message: "Could not find the course",
        });
      }
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: "You have already enrolled this course.",
        });
      }
      totalAmount += course.price;
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err,
      });
    }
  }
 
  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Date.now().toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    res.json({
      success: true,
      message: paymentResponse,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Could not Initiate the orders.",
    });
  }
};

// Verify the Payments
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const { courses } = req.body;
  const { id } = req.user;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !id
  ) {
    res.status(200).json({
      success: false,
      message: "Payment Failed",
    });
  }
  console.log("1")
  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");
    console.log("2")
  if (expectedSignature == razorpay_signature) {
    // enroll the student
    await enrollStudents(courses, id, res);
    return res.status(200).json({
      success: true,
      message: "Payment Verfied",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Payment Failed",
  });
};

exports.sendPaymentSuccessEmail = async(req,res) =>{

  const { orderId , paymentId , amount } = req.body;
  const id = req.user.id;
  console.log(id)
  if(!orderId || !amount || !paymentId || !id){
    return res.status(400).json({
      success:false,
      message:"Please provide all the fields"
    })}

  try{

    const enrolledStudent = await user.findById(id);

    await mailSender(enrolledStudent.email,`Payment Recieved`,paymentSuccessEmail(`${enrolledStudent.firstname} ${enrolledStudent.lastname}`,amount/100,orderId,paymentId))

    console.log("3");
  }catch(err){
    console.log("error in sending mail",err.message);
    return res.status(500).json({
      success:false,
      message:"Could not send email"
    })
  }
}


// Below this is for only one course and the above works for both multiple as well as  single course payment and in verifypayment this time we have not used webHook. 





// // Capture the payment and create the razorpay order/payment initialization.
// // Buy now pa click karna pa ye chalega.
// exports.capturePayment = async (req, res) => {
//   try {
//     // get courseId and userId
//     const { courseId } = req.body;
//     const { id } = req.user;

//     // Validation
//     if (!courseId) {
//       return res.json({
//         success: false,
//         message: "Please provide valid courseID",
//       });
//     }

//     // Valid courseDetail coming from courseID
//     let course;
//     try {
//       course = await Course.findById(courseId);
//       if (!course) {
//         return res.json({
//           success: false,
//           message: "Couldn't find the course",
//         });
//       }
//       // user already pay for some courses
//       const uid = new mongoose.Types.ObjectId(id);
//       // helps in converting the string UserID into OjectID
//       if (course.studentsEnrolled.includes(uid)) {
//         return res.status(200).json({
//           success: false,
//           message: "You have already enrolled this course.",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({
//         success: false,
//         message: err.message,
//       });
//     }

//     // Order create

//     const amount = course.price;
//     const currency = "INR";
//     const options = {
//       amount: amount * 100,
//       currency,
//       receipt: Date.now().toString(),
//       notes: {
//         courseID: courseId,
//         id,
//       },
//     };

//     try {
//       // Initiate the payment using razorpay
//       const paymentResponse = await instance.orders.create(options);
//       console.log(paymentResponse);
//       // return response
//       return res.status(200).json({
//         success: true,
//         courseName: course.title,
//         courseDescription: course.description,
//         thumbnail: course.thumbnail,
//         orderID: paymentResponse.id,
//         currency: paymentResponse.currency,
//         amount: paymentResponse.amount,
//       });
//     } catch (err) {
//       console.log(err);
//       return res.json({
//         success: false,
//         message: "Error creating order",
//       });
//     }
//   } catch (err) {
//     return res.status(500).json({
//       error: err,
//       message: "Error in Capturing Payment",
//     });
//   }
// };

// // verify Signature of Razorpay and Server
// exports.verifySignature = async (req, res) => {
//   try {
//     const webHookSecret = "12345678";
//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webHookSecret);
//     console.log("shasum: ", shasum);
//     //  A checksum is a technique used to determine the authenticity of received data, i.e., to detect whether there was an error in transmission. Along with the data that needs to be sent, the sender uses an algorithm to calculate the checksum of the data and sends it along.

//     //  This method makes the use of Checksum Generator on Sender side and Checksum Checker on Receiver side.
//     shasum.update(JSON.stringify(req.body));
//     console.log("UpdatedShasum :", shasum);

//     const digest = shasum.digest("hex");
//     //In cryptography, a digest is the fixed-length output produced by a hash function it is applied to a variable-length input.
//     console.log("DIGEST : ", digest);

//     if (signature === digest) {
//       console.log("Payment is Authorizied");

//       // for updating the cousreID in user details and userID in course details we need to get the userID and courseID. But this time this request has come from the razorpay not from the frontend so we cant fetch value from headers .so we fetch the details using notes in the options from order .

//       const { courseID, id } = req.body.payload.payment.entity.notes;

//       try {
//         // find the course and enroll student in it
//         const enrolledcourse = await Course.findByIdAndUpdate(
//           { _id: courseID },
//           { $push: { studentsEnrolled: id } },
//           { new: true }
//         );

//         if (!enrolledcourse) {
//           return res.json({
//             success: false,
//             message: "Course not found.",
//           });
//         }

//         console.log("enrolledcourse : ", enrolledcourse);

//         // Find the student and add Course to their list of enrolled courses
//         const enrolledStudent = await user.findByIdAndUpdate(
//           { _id: id },
//           { $push: { courses: courseID } },
//           { new: true }
//         );

//         console.log(enrolledStudent);

//         // mail send for confirmation on enrollment to the course
//         const mailResponse = mailSender(
//           enrolledStudent.email,
//           "Congratulations ,from CodeHelp ",
//           "Congrats , You are enrolled in the course"
//         );

//         return res.status(200).json({
//           success: true,
//           message: "You have been successfully Enrolled in this course.",
//         });
//       } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//           success: false,
//           message: err.message,
//         });
//       }
//     } else {
//       return res.status(400).json({
//         sucess: false,
//         message: "Secret of WeebHook doesn't matches .",
//       });
//     }
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
