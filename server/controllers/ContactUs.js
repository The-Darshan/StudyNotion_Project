const {contactUsEmail} = require("../mail/templates/contactFormRes");
const mailSender = require("../utility/nodemailer");

exports.contactUsController = async (req,res)=>{
    try{
        const {firstname , lastname,email,phoneNo,message,countrycode} = req.body

        const mail = await mailSender(email,"Your Data Send Successfully",  contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
        )
        console.log("Email Response : ",mail);

        return res.json({
            success: true,
            message: "Email send successfully",
          })      

    }catch(err){
        return res.status(500).json({
            status:false,
            message:"Error in Contact Us Controller",
            Error: err.message
        })
    }
}