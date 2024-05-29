const User = require("../models/UserModel");
const OTPgenerator = require("otp-generator");
const OTP = require("../models/OtpModel");
const bcrypt = require("bcrypt");
const Profile = require("../models/ProfileModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const mailsender = require("../utility/nodemailer");
const {passwordUpdated} = require("../mail/templates/passwordUpdate")

// sendOTP
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const existuser = await User.findOne({ email });
    console.log("A")
    // Check if the user is already present or not
    if (existuser) {
      return res.status(409).json({
        success: false,
        Message: "Already registered with this email .",
      });
    }

    let otp = OTPgenerator.generate(6, {
      specialChars: false,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
    });

    console.log("OTP Generated : ", otp);
    console.log("B")
    let result = await OTP.findOne({ otp });

    // Worst case for generating unquie pasword
    while (result) {
      otp = OTPgenerator.generate(6, {
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp });
    }

    const otpBody = await OTP.create({ email, otp });
    console.log(otpBody);
    console.log("ALoo")

    return res.status(200).json({
      success: true,
      Message: "OTP sent successfully",
      OTP,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      Error: err,
      Message: "Error in OTP generation",
    });
  }
};

// signup

exports.SignUp = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
        password,
      confirmpassword,
      accounttype,
      otp,
    } = req.body;

    if (!email || !password || !firstname || !lastname) {
      return res.status(401).json({
        success: false,
        Message: "Enter the email and password before signing in",
      });
    }
    console.log("1")
    // if (!email.includes("@gmail.com")) {
    //   return res.status(403).json({
    //     success: false,
    //     Message: "Email should contain @gmail.com at last",
    //   });
    // }

    // const emailCheck = email.split("@gmail.com");

    // if (emailCheck.length  > 2) {
    //   res.json({
    //     success: false,
    //     Message: "Email Id should have only one @gmail.com",
    //   });
    // }

    // if (emailCheck[1] !== "") {
    //   res.json({
    //     success: false,
    //     Message: "Nothing Should written after @gmail.com",
    //   });
    // }

    const existuser = await User.findOne({ email });
    if (existuser) {
      return res.status(409).json({
        success: false,
        Message: "Already registered with this email .",
      });
    }

    if (password !== confirmpassword) {
      res.status(401).json({
        success: false,
        Message: "Password doesn't match with confirm password.",
      });
    }
    console.log(password,confirmpassword)
    // find most recent OTP stored for the user
    const recentOTP = await OTP.find({ email })
      .sort({ createdAT: -1 })
      .limit(1);

    console.log("Recent OTP :" , recentOTP);
    
    if (recentOTP.length == 0) {
      return res.status(400).json({
        success: false,
        Message: "OTP not valid",
      });
    } else if (otp != recentOTP[0].otp) {
      res.status(400).json({
        success: false,
        Message: "Invalid OTP entered.",
      });
    }
    console.log("2")
    let hashedpass = await bcrypt.hash(password, 10);
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      contactNumber: null,
      about: null,
    });
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedpass,
      accounttype,
      additionalinfo: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
    });
    console.log("3")
    const createdUser = await user.save();
    console.log("5")
    return res.status(200).json({
      success: true,
      user: createdUser,
      Message: "Signed Up successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      Error: err,
      Message: "Error in signing up",
    });
  }
};
// login
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        Message: "Please enter valid Email or Password",
      });
    }

    const user = await User.findOne({ email }).populate("additionalinfo");
    if (!user) {
      return res.status(401).json({
        success: false,
        Message: "Please go to sign up and sign in first",
      });
    }
    const check = await bcrypt.compare(password, user.password);

    const payload = {
      role: user.accounttype,
      id: user._id,
      email: user.email,
    };


    if (check) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "6h",
      });
      // user= user.toObject() {Agar error aya to enable kar dunga}
      user.token = token;
      user.password = undefined;

      const options = {
        httpOnly: true,
        expires: new Date(Date.now() + 3*24*60*60*1000),
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        Message: "Login Successful",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      Error: err,
      Message: "Error in Login",
    });
  }
};

// changepassword
exports.changePassword = async (req, res) => {
  try {
    const { password, newpass } = req.body;
    const userID = req.user.id;
    console.log("0")
    const user = await User.findById( userID );
    if (!user) {
      return res.status(401).json({ Message: "User Not Found" });
    }

    if (!password) {
      return res.status(404).json({
        success: false,
        Message: "Enter a valid Password",
      });
    }

    const check = await bcrypt.compare(password, user.password);
    if(!check){
      return res.status(400).json({
        message:"Entered passord is wrong Password."
      })
    }

    const newhashpass = await bcrypt.hash(newpass, 10);

     await User.findByIdAndUpdate(
       userID ,
      { password: newhashpass },
      { new: true }
    );
    await mailsender(
      user.email,
      "Password for your account has been updated",
      passwordUpdated(user.email, `Password updated successfully for ${user.firstname} ${user.lastname}`)
    );
    return res.status(200).json({
      success: true,
      Message: "Password Updated",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
      message: "Password is not changed . Please try again after sometime",
    });
  }
};
