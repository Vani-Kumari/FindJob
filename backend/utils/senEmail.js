import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
        logger: true, // logs in terminal
        debug: true,  // extra debug info
      });
  
      const mailOptions = {
        from: `"JobFinder" <${process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: ", info.messageId);
  
    } catch (err) {
      console.error("Failed to send email: ", err);
    }
  };
  