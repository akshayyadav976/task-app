const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelcomeEmail =(email,name) =>{
    sgMail.send({
        to: email,
        from: 'akshayy976@yahoo.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: `easy to do anywhere  ${name} even with Node.js`,
    })
}

const sendCancelationEmail =(email,name) =>{
    sgMail.send({
        to: email,
        from: 'akshayy976@yahoo.com',
        subject: 'Sorry to se you go',
        text: `GoodBye! ${name}. See you soon`,
    })
}
module.exports={
    sendWelcomeEmail,
    sendCancelationEmail
}