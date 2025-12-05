const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'haavatar123@gmail.com',
      pass: 'mkiivtyckhodhfuc'
    }
  });

module.exports = { transporter };
