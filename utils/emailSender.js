const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function enviarCodigoPorCorreo(destinatario, codigo) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: destinatario,
        subject: 'Código de verificación',
        text: `Tu código de verificación es: ${codigo}`
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { enviarCodigoPorCorreo };
