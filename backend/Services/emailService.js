const transporter = require('../Config/email');

const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log('Email Sent Successfully');
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;