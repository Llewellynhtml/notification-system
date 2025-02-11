const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lsg.mllewellyn@gmail.com",
    pass: "bfnq jvvh cszd gxft", 
  },
});

const sendEmail = (to, subject, text) => {
  console.log(to);
  const mailOptions = {
    from: "lsg.mllewellyn@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
