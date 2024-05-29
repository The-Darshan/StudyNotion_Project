const mongoose = require("mongoose")
const mail = require("../utility/nodemailer")
const emailTemplate = require("../mail/templates/emailVerficationTeplate")

const otpSchema = new mongoose.Schema({
    otp:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    createdAT:{
        type:Date,
        required:true,
        default: Date.now(),
        expires:5*60,
    },
})

    async function sendOtpMail(email,otp){
        try{
            const mailResponse = await mail(email,"Verfication email from Studynotion",emailTemplate(otp));
            console.log(`Email has been sent to ${email} : ${mailResponse}`);
        }catch(err){
            console.log("Error occured while sending mail: ",err)
            throw err
        }
    }

    otpSchema.pre("save",async function (next){
        await sendOtpMail(this.email,this.otp)
        next();
    })

module.exports = mongoose.model("OTP",otpSchema)