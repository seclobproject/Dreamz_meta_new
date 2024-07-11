import nodemailer from "nodemailer";

const CLIENT_ID = "shyamkumarbeypore@gmail.com";
const CLIENT_SECRET = "lwxe qbgk xhta dwqs";
const url="https://dreamzmeta.com"

export const sendMail = (mailId, name, sponserid, password,username) => {
  const recipient = mailId;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: CLIENT_ID,
      pass: CLIENT_SECRET,
    },
  });
  const mailOptions = {
    from: `DREAMZMETA GROUP <dreamzmeta@gmail.com>`,
    to: `${recipient}`,
    subject: `Hi ${name}, Registration successful.`,
    text: `Hi ${name}, Welcome to Dreamzmeta`,
    html: `<h4>Congrats! You have joined the DREAMZMETA Group.</h4><p>Your sponserID is <strong>${sponserid}</strong><br/>Username: ${username?.recipient}<br />Password: ${password}</p></p><p>You have successfully got the 10 digital visiting cards when you give 50$.</p><br />Website: <a href="${url}">${url}</a></p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email has been sent:-", info.response);
    }
  });
};
