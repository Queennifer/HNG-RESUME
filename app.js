require("dotenv").config();
const express = require('express');

const app = express();
const path = require ('path');
const nodemailer= require ('nodemailer');

const MAIL = "jennicodes@gmail.com"; 
const MAILPASS = "jennicodes21*";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res) => {
    res.sendFile( path.join(__dirname, "public/srt-resume.html"));
});

app.post("/submit", (req,res) => {
    const { fullname, email, message } =  req.body;


    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: MAIL, 
            pass: MAILPASS, 
        }
    });
    
    
    
    let mailOptions = {
        from: 'Jenni Ok  <chiajjenn@example.com>', // sender address
        to: "chideraajennifer@gmail.com", // list of receivers
        subject: `A new message from ${fullname } on my resume`, // plain text body
        html: `<p>A user with ${email} sent you a message :</p>
        <p>${message}</p>` // html body
    }
    
    
    transporter.sendMail(mailOptions, (err,resp) => {
        if(err) {
            console.log(`Mail error `, err);
        }  else {
            console.log(`Mail Sent successfully `, resp.messageId);
        }
    });

    res.send("Your response has been recorded");

})

  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log('Server is listening on port ' + PORT));