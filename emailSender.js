const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const accountTransport = require('./account_transport.json');

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
        accountTransport.auth.clientId,
        accountTransport.auth.clientSecret,
        'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
        refresh_token: accountTransport.auth.refreshToken
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: accountTransport.auth.user,
            clientId: accountTransport.auth.clientId,
            clientSecret: accountTransport.auth.clientSecret,
            refreshToken: accountTransport.auth.refreshToken,
            accessToken: accessToken.token
        }
    });

    return transporter;
};

const sendEmail = async (emailData) => {
    const emailTransporter = await createTransporter();

    const mailOptions = {
        from: 'FerreHogar <ventas@ferrehogar.com>',
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.body
    };

    emailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });
};

module.exports = sendEmail;
