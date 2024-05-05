const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const mailOptions = (to, subject, text, html) => ({
  from: {
    name: "MovieBookTicket",
    address: process.env.EMAIL_USER,
  },
  to,
  subject,
  text,
  html,
});

const sendMail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail(mailOptions(to, subject, text, html));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = sendMail;
