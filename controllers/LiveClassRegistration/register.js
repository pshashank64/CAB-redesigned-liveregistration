const express = require("express");
const nodemailer = require("nodemailer");
const registerModel = require("./registerModel");

const router = express.Router();

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0063f8a63c9ee5",
      pass: "ce86b6faaba607"
    }
});

router.post("/student/register", async (req, res) => {
    const register = await new registerModel({
        fullname: req.body.fullname,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        address: req.body.address,
        courseName: req.body.courseName
    });
    await register.save().then((data) => {
        // res.status(200).json(data);
        var mailOptions={
            from: "codesandbots@gmail.com",
            to: data.email,
           subject: "Registration Successful!",
           html: "<h1>Thanks for registering to the course</h1><br /><p>You have chosen the course: " +data.courseName+ "</p>" // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.response);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));  
        });
    }).then(() => {
        res.status(200).json({
            "message": "User is registered and the mail has been sent"
        })
    });
})

module.exports = router;