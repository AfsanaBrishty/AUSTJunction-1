var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sajidahmed696@gmail.com',
    pass: 'cutelooperSAJID'
  }
});

var mailOptions = {
  from: 'sajidahmed696@gmail.com',
  to: 'cybersajid1997@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});