const nodemailer = require("nodemailer")
const asyncHandler = require("express-async-handler");
const crypto = require("crypto")
const MAIL_ID = "pariharharsh337@gmail.com"
const MAIL_PASS = "klvq pxze eyam zfqc"

// With this data we will get the to,subject , text and all
const sendEmail = asyncHandler(async(data,req,res)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: MAIL_ID,
          pass: MAIL_PASS,
        },
      });
        const info = await transporter.sendMail({
          from: '"Hey 👻" <abc@gmail.com>', // sender address
          to: data.to, // list of receivers
          subject: data.subject, // Subject line
          text: data.text, // plain text body
          html: data.htm, // html body
        })
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL : %s ", nodemailer.getTestMessageUrl(info))
        
})

module.exports = sendEmail