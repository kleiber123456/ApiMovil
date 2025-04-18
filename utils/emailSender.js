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

// Función para enviar comprobante de venta
async function enviarComprobanteVenta(destinatario, nombre, ventaInfo, items) {
    // Formatear los items para el correo
    const itemsHtml = items.map(item => `
        <tr>
            <td>${item.nombre}</td>
            <td>${item.cantidad || 1}</td>
            <td>$${item.precioUnitario.toFixed(2)}</td>
            <td>$${item.subtotal.toFixed(2)}</td>
        </tr>
    `).join('');

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: destinatario,
        subject: `Comprobante de Venta #${ventaInfo.idVenta}`,
        html: `
            <h2>¡Hola ${nombre}!</h2>
            <p>Gracias por tu compra. Aquí tienes el detalle de tu venta:</p>
            
            <h3>Información de la Venta</h3>
            <p><strong>Número de Venta:</strong> ${ventaInfo.idVenta}</p>
            <p><strong>Fecha:</strong> ${new Date(ventaInfo.fecha).toLocaleString()}</p>
            <p><strong>Vehículo:</strong> ${ventaInfo.vehiculoPlaca} (${ventaInfo.vehiculoMarca} ${ventaInfo.vehiculoReferencia})</p>
            
            <h3>Detalle de la Compra</h3>
            <table border="1" cellpadding="5" cellspacing="0" style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" style="text-align:right;"><strong>Total:</strong></td>
                        <td><strong>$${ventaInfo.total.toFixed(2)}</strong></td>
                    </tr>
                </tfoot>
            </table>
            
            <p>Si tienes alguna pregunta sobre tu compra, no dudes en contactarnos.</p>
            <p>¡Gracias por confiar en nosotros!</p>
        `
    };

    return transporter.sendMail(mailOptions);
}

// ... (mantén las funciones existentes)

module.exports = {
    enviarCodigoPorCorreo,
    enviarCorreoRegistroExitoso,
    enviarCorreoCambioPassword,
    enviarComprobanteVenta
};
