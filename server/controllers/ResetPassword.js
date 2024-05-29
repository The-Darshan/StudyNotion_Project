const User = require("../models/UserModel")
const mailsender = require("../utility/nodemailer")
const bcrypt = require("bcrypt")
const crypto = require('crypto');

// resetPassToken
// User login tha par token expire ho gya to usey wapas password yaad nhi to wo ab reset password pa jayega isliye auth wala middleware nhi lagaya kyuki token expire ho chuka h .
exports.resetPasswordToken = async (req,res)=>{
    try{
        // get email from req body
        const {email} = req.body

        // check user for this email
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                status:false,
                Message:"Your Email is not registered with us"
        })}
        // generate Token
        const token = crypto.randomBytes(20).toString("hex");
        // update user by adding token and expirae time
        const updatedDetails = await User.findOneAndUpdate({email:email}, {
            token:token,
            resetPasswordExpire:Date.now() + 5*60*1000
        },{new:true})
        console.log("a")
        // create url
        const url = `http://localhost:3000/update-password/${token}`

        // send mail containing url
        await mailsender(email,"Password Reset Link",`Password Reset Link :${url}`)
        console.log("a")
        // return response 
        return res.json({
            success:true,
            Message:"Reset Password Link sent",
            updatedDetails
        })

    }catch(err){
        return res.status(500).json({
            status:false,
            Error:err,
            Message:"Error in sending reset link"
    })  
    }
}

// resetPassword 
exports.resetPassword = async(req,res)=>{
    try{
        const {newpass,confirmpass,token} = req.body

        if(!token){
            return res.status(403).json({
                status:false,
                Message:"Token Missing please try again ."
        }) }

        if(newpass !== confirmpass){
            return res.status(422).json({
                status:false,
                Message:"Password not matched"
        })  }
        const olduser = await User.findOne({token})

        if(!olduser){
            return res.json({
                status:false,
                Message:"User doesn't exsist."
        })}

        if( olduser.resetPasswordExpire < Date.now()){
            return res.json({
                status:false,
                Message:"Token Expired ."
        })
        }

        const newhashpass = await bcrypt.hash(newpass,10);

        await User.findOneAndUpdate({token} , {password :newhashpass},{new:true})

        return res.status(200).json({
            status:true,
            Message:"Password Updated with New Password ."
    }) 
    }catch(err){
        return res.status(500).json({
            status:false,
            Error:err,
            Message:"Error in reseting the password , try again after sometime ."
    }) 
    }
}