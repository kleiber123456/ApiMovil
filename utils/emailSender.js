// utils/emailSender.js

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

async function enviarCorreoRegistroExitoso(destinatario, nombre) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: destinatario,
        subject: '¡Registro exitoso!',
        html: `
            <h2>¡Hola ${nombre}!</h2>
            <p>Gracias por registrarte. Tu cuenta ha sido creada exitosamente.</p>
            <p>¡Bienvenido a nuestra plataforma!</p>
        `
    };

    return transporter.sendMail(mailOptions);
}
async function enviarCorreoCambioPassword(destinatario, nombre) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: destinatario,
        subject: 'Contraseña actualizada',
        html: `
            <h2>Hola ${nombre},</h2>
            <p>Te informamos que la contraseña de tu cuenta ha sido modificada recientemente.</p>
            <p>Si no fuiste tú, por favor contacta con soporte inmediatamente.</p>
            <br>
            <p>¡Gracias por usar nuestra plataforma!</p>
        `
    };

    return transporter.sendMail(mailOptions);
}

module.exports = {
    enviarCodigoPorCorreo,
    enviarCorreoRegistroExitoso,
    enviarCorreoCambioPassword
};
