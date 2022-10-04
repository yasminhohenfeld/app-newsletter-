const nodemailer = require('nodemailer');

const transportador = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'substituir', // generated ethereal user
        pass: 'substituir', // generated ethereal password
    },
});


module.exports = transportador