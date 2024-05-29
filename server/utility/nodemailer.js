const nodemailer = require("nodemailer")
require("dotenv").config()

  const mailSender = async(email,title,body)=>{
    let transporter = nodemailer.createTransport({
    host : process.env.MAIL_HOST,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
    }
    }) 

    let info = await transporter.sendMail({
        from:"Darshan",
        to:email,//without template literals
        subject:title,
        html:body,
    })
    return info;
}

module.exports = mailSender